import assert from 'node:assert/strict';
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';

const ROOT = resolve(process.cwd());

function compileForTest(outDir) {
  const files = [
    resolve(ROOT, 'src/types.ts'),
    resolve(ROOT, 'src/localize/localize.ts'),
    resolve(ROOT, 'src/utils/date-time.ts'),
    resolve(ROOT, 'src/utils/action-handler.ts'),
  ];

  const compilerOptions = {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    outDir,
    rootDir: resolve(ROOT, 'src'),
    strict: true,
    esModuleInterop: true,
    skipLibCheck: true,
  };

  const host = ts.createCompilerHost(compilerOptions);
  const originalWriteFile = host.writeFile.bind(host);
  host.writeFile = (fileName, text, writeByteOrderMark, onError, sourceFiles) => {
    // Rewrite relative extensionless imports to .js for Node ESM
    const fixedText = text.replace(
      /(from\s+['"])(\.[^'"]+?)(['"])/g,
      (match, p1, spec, p3) => (spec.endsWith('.js') ? match : `${p1}${spec}.js${p3}`)
    );
    originalWriteFile(fileName, fixedText, writeByteOrderMark, onError, sourceFiles);
  };

  const program = ts.createProgram(files, compilerOptions, host);
  const emitResult = program.emit();
  const diagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);

  const errors = diagnostics.filter((d) => d.category === ts.DiagnosticCategory.Error);
  if (errors.length > 0) {
    const formatted = ts.formatDiagnosticsWithColorAndContext(errors, {
      getCurrentDirectory: () => ROOT,
      getCanonicalFileName: (f) => f,
      getNewLine: () => '\n',
    });
    throw new Error(`TypeScript compilation errors:\n${formatted}`);
  }

  writeFileSync(join(outDir, 'package.json'), JSON.stringify({ type: 'module' }));
}

async function runTests() {
  const tempOut = mkdtempSync(join(tmpdir(), 'simple-clock-test-'));
  let passed = 0;
  const check = (name, fn) => {
    fn();
    passed += 1;
    console.log(`  ✓ ${name}`);
  };

  try {
    console.log('1. Compiling TypeScript utility & localization modules...');
    compileForTest(tempOut);

    const localizeMod = await import(pathToFileURL(join(tempOut, 'localize/localize.js')).href);
    const dtMod = await import(pathToFileURL(join(tempOut, 'utils/date-time.js')).href);
    const actionMod = await import(pathToFileURL(join(tempOut, 'utils/action-handler.js')).href);

    const {
      TRANSLATIONS,
      SUPPORTED_LANGUAGES,
      resolveLanguage,
      localize,
    } = localizeMod;
    const {
      formatTimeParts,
      formatDateString,
      computeCardBackground,
      parseColorToRgb,
      resolveEntityDisplay,
    } = dtMod;
    const {
      hasAction,
      hasAnyAction,
      resolveCardActionConfig,
      resolveEntityActionConfig,
      resolveEntityIconColor,
    } = actionMod;

    console.log('2. Verifying multi-language support (9 languages)...');
    const expectedLanguages = ['en', 'es', 'it', 'pt', 'pt-BR', 'ru', 'de', 'fr', 'zh-Hans'];

    check('All 9 languages are registered and complete in TRANSLATIONS', () => {
      assert.deepEqual(
        SUPPORTED_LANGUAGES.map((l) => l.value),
        expectedLanguages
      );
      const enKeys = Object.keys(TRANSLATIONS.en);
      for (const lang of expectedLanguages) {
        assert.ok(TRANSLATIONS[lang], `Missing translations for ${lang}`);
        for (const key of enKeys) {
          assert.ok(
            typeof TRANSLATIONS[lang][key] === 'string' && TRANSLATIONS[lang][key].length > 0,
            `Missing key "${key}" in "${lang}"`
          );
        }
      }
    });

    check('Language auto-detection resolves regional variants accurately', () => {
      assert.equal(resolveLanguage('auto', 'es-AR'), 'es');
      assert.equal(resolveLanguage('auto', 'pt-BR'), 'pt-BR');
      assert.equal(resolveLanguage('auto', 'pt-PT'), 'pt');
      assert.equal(resolveLanguage('auto', 'zh-CN'), 'zh-Hans');
      assert.equal(resolveLanguage('auto', 'zh-Hans'), 'zh-Hans');
      assert.equal(resolveLanguage('auto', 'ru_RU'), 'ru');
      assert.equal(resolveLanguage('auto', 'de-AT'), 'de');
      assert.equal(resolveLanguage('auto', 'fr-CA'), 'fr');
      assert.equal(resolveLanguage('auto', 'it-IT'), 'it');
      assert.equal(resolveLanguage('auto', 'ja-JP'), 'en');
      assert.equal(resolveLanguage('es', 'en-US'), 'es');
    });

    // Fixed UTC timestamp: 2026-11-16T15:04:05Z (Monday, Nov 16, 2026)
    const sampleDate = new Date('2026-11-16T15:04:05Z');

    check('Long date formatting works across all 9 languages (UTC)', () => {
      const baseCfg = {
        type: 'custom:simple-clock-card',
        date_format_type: 'long',
        long_weekday_format: 'long',
        long_month_format: 'long',
        long_show_year: true,
        capitalize_date: true,
        timezone: 'UTC',
      };

      assert.equal(
        formatDateString(sampleDate, { ...baseCfg, short_date_order: 'MDY' }, 'en'),
        'Monday, November 16, 2026'
      );
      assert.equal(
        formatDateString(sampleDate, baseCfg, 'es'),
        'Lunes, 16 de noviembre de 2026'
      );
      assert.equal(
        formatDateString(sampleDate, baseCfg, 'it'),
        'Lunedì 16 novembre 2026'
      );
      assert.equal(
        formatDateString(sampleDate, baseCfg, 'pt'),
        'Segunda-feira, 16 de novembro de 2026'
      );
      assert.equal(
        formatDateString(sampleDate, baseCfg, 'pt-BR'),
        'Segunda-feira, 16 de novembro de 2026'
      );
      assert.equal(
        formatDateString(sampleDate, baseCfg, 'ru'),
        'Понедельник, 16 ноября 2026 г.'
      );
      assert.equal(
        formatDateString(sampleDate, baseCfg, 'de'),
        'Montag, 16. November 2026'
      );
      assert.equal(
        formatDateString(sampleDate, baseCfg, 'fr'),
        'Lundi 16 novembre 2026'
      );
      assert.equal(
        formatDateString(sampleDate, baseCfg, 'zh-Hans'),
        '2026年11月16日 星期一'
      );
    });

    check('French 1st-of-month uses "1er" and short month formatting works', () => {
      const novFirst = new Date('2026-11-01T12:00:00Z');
      assert.equal(
        formatDateString(
          novFirst,
          {
            type: 'custom:simple-clock-card',
            date_format_type: 'long',
            long_weekday_format: 'short',
            long_month_format: 'long',
            long_show_year: true,
            capitalize_date: true,
            timezone: 'UTC',
          },
          'fr'
        ),
        'Dim 1er novembre 2026'
      );

      assert.equal(
        formatDateString(
          sampleDate,
          {
            type: 'custom:simple-clock-card',
            date_format_type: 'long',
            long_weekday_format: 'short',
            long_month_format: 'short',
            long_show_year: false,
            capitalize_date: true,
            timezone: 'UTC',
          },
          'es'
        ),
        'Lun, 16 nov'
      );
    });

    console.log('3. Verifying short date formats (DD/MM/AAAA, MM/DD/AAAA, AAAA/MM/DD)...');
    check('Short date formats DMY, MDY, YMD, separators & 2-digit year', () => {
      assert.equal(
        formatDateString(
          sampleDate,
          {
            type: 'custom:simple-clock-card',
            date_format_type: 'short',
            short_date_order: 'DMY',
            short_date_separator: '/',
            short_year_2_digits: false,
            timezone: 'UTC',
          },
          'es'
        ),
        '16/11/2026'
      );
      assert.equal(
        formatDateString(
          sampleDate,
          {
            type: 'custom:simple-clock-card',
            date_format_type: 'short',
            short_date_order: 'MDY',
            short_date_separator: '/',
            short_year_2_digits: false,
            timezone: 'UTC',
          },
          'en'
        ),
        '11/16/2026'
      );
      assert.equal(
        formatDateString(
          sampleDate,
          {
            type: 'custom:simple-clock-card',
            date_format_type: 'short',
            short_date_order: 'YMD',
            short_date_separator: '-',
            short_year_2_digits: true,
            timezone: 'UTC',
          },
          'en'
        ),
        '26-11-16'
      );
      assert.equal(
        formatDateString(
          sampleDate,
          {
            type: 'custom:simple-clock-card',
            date_format_type: 'both',
            short_date_order: 'DMY',
            short_date_separator: '.',
            long_weekday_format: 'short',
            capitalize_date: true,
            timezone: 'UTC',
          },
          'de'
        ),
        'Mo, 16.11.2026'
      );
    });

    console.log('4. Verifying time modes (h, hm, hms), 12h/24h & timezone...');
    check('Time modes h / hm / hms, leading zero, 12h AM/PM & midnight edge case', () => {
      const midnightUtc = new Date('2026-11-16T00:05:09Z');

      const onlyHours = formatTimeParts(
        sampleDate,
        { type: 'custom:simple-clock-card', time_mode: 'h', use_24h: true, timezone: 'UTC' }
      );
      assert.equal(onlyHours.hours, '15');
      assert.equal(onlyHours.showMinutes, false);
      assert.equal(onlyHours.showSeconds, false);

      const hm12 = formatTimeParts(
        sampleDate,
        {
          type: 'custom:simple-clock-card',
          time_mode: 'hm',
          use_24h: false,
          leading_zero: false,
          show_ampm: true,
          timezone: 'UTC',
        }
      );
      assert.equal(hm12.hours, '3');
      assert.equal(hm12.minutes, '04');
      assert.equal(hm12.ampm, 'PM');
      assert.equal(hm12.showMinutes, true);
      assert.equal(hm12.showSeconds, false);
      assert.equal(hm12.showAmPm, true);

      const hmsMidnight24 = formatTimeParts(
        midnightUtc,
        {
          type: 'custom:simple-clock-card',
          time_mode: 'hms',
          use_24h: true,
          leading_zero: true,
          timezone: 'UTC',
        }
      );
      assert.equal(hmsMidnight24.hours, '00');
      assert.equal(hmsMidnight24.minutes, '05');
      assert.equal(hmsMidnight24.seconds, '09');
      assert.equal(hmsMidnight24.showSeconds, true);

      const hmsMidnight12 = formatTimeParts(
        midnightUtc,
        {
          type: 'custom:simple-clock-card',
          time_mode: 'hms',
          use_24h: false,
          leading_zero: true,
          timezone: 'UTC',
        }
      );
      assert.equal(hmsMidnight12.hours, '12');
      assert.equal(hmsMidnight12.ampm, 'AM');

      // Buenos Aires is UTC-3 -> 15:04 UTC = 12:04 ART
      const buenosAires = formatTimeParts(
        sampleDate,
        {
          type: 'custom:simple-clock-card',
          time_mode: 'hm',
          use_24h: true,
          timezone: 'America/Argentina/Buenos_Aires',
        }
      );
      assert.equal(buenosAires.hours, '12');
      assert.equal(buenosAires.minutes, '04');
    });

    console.log('5. Verifying color & card transparency utilities...');
    check('Color parsing and opacity background computation', () => {
      assert.deepEqual(parseColorToRgb('#1e293b'), [30, 41, 59]);
      assert.deepEqual(parseColorToRgb([10, 20, 30]), [10, 20, 30]);
      assert.equal(computeCardBackground('#1e293b', 0), 'transparent');
      assert.equal(computeCardBackground([30, 41, 59], 50), 'rgba(30, 41, 59, 0.5)');
      assert.equal(computeCardBackground('#ff0000', 100), 'rgb(255, 0, 0)');
      assert.equal(computeCardBackground(undefined, 100), undefined);
      assert.ok(computeCardBackground(undefined, 35)?.includes('35%'));
    });

    console.log('6. Verifying entity state & attribute extraction...');
    const mockHass = {
      states: {
        'weather.home': {
          entity_id: 'weather.home',
          state: 'partlycloudy',
          attributes: {
            friendly_name: 'Casa',
            temperature: 23.4,
            temperature_unit: '°C',
            humidity: 58,
          },
        },
        'sensor.living_temp': {
          entity_id: 'sensor.living_temp',
          state: '21.8',
          attributes: {
            friendly_name: 'Living Temp',
            device_class: 'temperature',
            unit_of_measurement: '°C',
          },
        },
      },
    };

    check('Extracts attribute value + inferred unit, custom name/unit, and main state', () => {
      const weatherTemp = resolveEntityDisplay(
        mockHass,
        {
          entity: 'weather.home',
          attribute: 'temperature',
          show_name: true,
          name: 'Exterior',
        },
        'es'
      );
      assert.equal(weatherTemp?.value, '23.4');
      assert.equal(weatherTemp?.unit, '°C');
      assert.equal(weatherTemp?.name, 'Exterior');
      assert.equal(weatherTemp?.available, true);

      const weatherHumidity = resolveEntityDisplay(
        mockHass,
        {
          entity: 'weather.home',
          attribute: 'humidity',
          show_unit: true,
        },
        'en'
      );
      assert.equal(weatherHumidity?.value, '58');
      assert.equal(weatherHumidity?.unit, '%');

      const sensorMain = resolveEntityDisplay(
        mockHass,
        {
          entity: 'sensor.living_temp',
          show_name: true,
          show_unit: false,
        },
        'en'
      );
      assert.equal(sensorMain?.value, '21.8');
      assert.equal(sensorMain?.unit, '');
      assert.equal(sensorMain?.name, 'Living Temp');
      assert.equal(sensorMain?.icon, 'mdi:thermometer');

      const missingAttr = resolveEntityDisplay(
        mockHass,
        { entity: 'weather.home', attribute: 'nonexistent' },
        'es'
      );
      assert.equal(missingAttr?.available, false);
      assert.equal(missingAttr?.value, localize('unavailable', 'es'));
    });

    console.log('7. Verifying card & entity actions and per-entity icon color...');
    check('hasAction and hasAnyAction evaluate action configurations accurately', () => {
      assert.equal(hasAction(undefined), false);
      assert.equal(hasAction({ action: 'none' }), false);
      assert.equal(hasAction({ action: '' }), false);
      assert.equal(hasAction({ action: 'more-info' }), true);
      assert.equal(hasAction({ action: 'navigate', navigation_path: '/lovelace/0' }), true);
      assert.equal(hasAction({ action: 'perform-action', perform_action: 'light.toggle' }), true);

      assert.equal(
        hasAnyAction({
          tap_action: { action: 'none' },
          double_tap_action: { action: 'none' },
          hold_action: { action: 'none' },
        }),
        false
      );
      assert.equal(
        hasAnyAction({
          tap_action: { action: 'none' },
          hold_action: { action: 'toggle' },
        }),
        true
      );
    });

    check('resolveCardActionConfig defaults to none and preserves configured actions', () => {
      const defaultCard = resolveCardActionConfig({ type: 'custom:simple-clock-card' });
      assert.deepEqual(defaultCard, {
        tap_action: { action: 'none' },
        double_tap_action: { action: 'none' },
        hold_action: { action: 'none' },
      });
      assert.equal(hasAnyAction(defaultCard), false);

      const configuredCard = resolveCardActionConfig({
        type: 'custom:simple-clock-card',
        tap_action: { action: 'navigate', navigation_path: '/lovelace/weather' },
        double_tap_action: { action: 'perform-action', perform_action: 'homeassistant.restart' },
        hold_action: { action: 'url', url_path: 'https://example.com' },
      });
      assert.equal(configuredCard.tap_action?.action, 'navigate');
      assert.equal(configuredCard.tap_action?.navigation_path, '/lovelace/weather');
      assert.equal(configuredCard.double_tap_action?.action, 'perform-action');
      assert.equal(configuredCard.hold_action?.action, 'url');
      assert.equal(hasAnyAction(configuredCard), true);
    });

    check('resolveEntityActionConfig defaults tap to more-info and honors explicit overrides', () => {
      const defaultSlot = resolveEntityActionConfig(
        { entity: 'sensor.living_temp' },
        'sensor.living_temp'
      );
      assert.deepEqual(defaultSlot, {
        entity: 'sensor.living_temp',
        tap_action: { action: 'more-info' },
        double_tap_action: { action: 'none' },
        hold_action: { action: 'none' },
      });
      assert.equal(hasAnyAction(defaultSlot), true);

      const disabledSlot = resolveEntityActionConfig(
        {
          entity: 'sensor.living_temp',
          tap_action: { action: 'none' },
        },
        'sensor.living_temp'
      );
      assert.equal(disabledSlot.tap_action?.action, 'none');
      assert.equal(hasAnyAction(disabledSlot), false);

      const customSlot = resolveEntityActionConfig(
        {
          entity: 'light.kitchen',
          tap_action: { action: 'toggle' },
          double_tap_action: { action: 'more-info' },
          hold_action: { action: 'navigate', navigation_path: '/lovelace/lights' },
        },
        'light.kitchen'
      );
      assert.equal(customSlot.entity, 'light.kitchen');
      assert.equal(customSlot.tap_action?.action, 'toggle');
      assert.equal(customSlot.double_tap_action?.action, 'more-info');
      assert.equal(customSlot.hold_action?.action, 'navigate');
    });

    check('resolveEntityIconColor prefers slot color, falls back to global, or returns undefined', () => {
      assert.equal(
        resolveEntityIconColor([255, 100, 0], [0, 128, 255]),
        'rgb(255, 100, 0)'
      );
      assert.equal(resolveEntityIconColor('#ff5500', [0, 128, 255]), 'rgb(255, 85, 0)');
      assert.equal(resolveEntityIconColor(undefined, [0, 128, 255]), 'rgb(0, 128, 255)');
      assert.equal(resolveEntityIconColor(undefined, undefined), undefined);
    });

    console.log('8. Verifying built output bundles...');
    check('dist/simple-clock-card.js and simple-clock-card.js exist and match', () => {
      const distPath = resolve(ROOT, 'dist/simple-clock-card.js');
      const rootPath = resolve(ROOT, 'simple-clock-card.js');
      assert.ok(existsSync(distPath), 'dist/simple-clock-card.js does not exist');
      assert.ok(existsSync(rootPath), 'simple-clock-card.js does not exist');

      const distContent = readFileSync(distPath, 'utf8');
      const rootContent = readFileSync(rootPath, 'utf8');
      assert.ok(distContent.length > 5000, 'Bundle seems unexpectedly small');
      assert.equal(distContent, rootContent, 'Root bundle copy differs from dist bundle');
      assert.ok(distContent.includes('simple-clock-card'), 'Missing card tag registration');
      assert.ok(
        distContent.includes('simple-clock-card-editor'),
        'Missing editor tag registration'
      );
      assert.ok(distContent.includes('getConfigElement'), 'Missing getConfigElement');
      assert.ok(distContent.includes('getGridOptions'), 'Missing getGridOptions');
    });

    console.log(`\nAll ${passed} verification checks passed!`);
  } finally {
    rmSync(tempOut, { recursive: true, force: true });
  }
}

runTests().catch((err) => {
  console.error('\nVerification failed:', err);
  process.exit(1);
});
