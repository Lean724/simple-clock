import { DATE_LOCALE_DATA, localize } from '../localize/localize';
import {
  ColorValue,
  DEFAULT_CONFIG,
  EntitySlotConfig,
  FontFamilyOption,
  HassEntity,
  HomeAssistant,
  ResolvedLanguage,
  SimpleClockCardConfig,
} from '../types';

export interface ZonedDateParts {
  year: number;
  month: number; // 1..12
  day: number; // 1..31
  weekdayIndex: number; // 0 (Sun)..6 (Sat)
  hour24: number; // 0..23
  minute: number; // 0..59
  second: number; // 0..59
}

export interface FormattedTimeParts {
  hours: string;
  minutes: string;
  seconds: string;
  ampm: string;
  showMinutes: boolean;
  showSeconds: boolean;
  showAmPm: boolean;
}

export interface ResolvedEntityDisplay {
  entityId: string;
  stateObj?: HassEntity;
  icon: string;
  name: string;
  value: string;
  unit: string;
  available: boolean;
}

const WEEKDAY_MAP: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

export function getZonedDateParts(date: Date, timeZone?: string): ZonedDateParts {
  const tz = timeZone?.trim() || undefined;
  if (tz) {
    try {
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        weekday: 'short',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hourCycle: 'h23',
      });
      const parts = formatter.formatToParts(date);
      const getNum = (type: Intl.DateTimeFormatPartTypes): number => {
        const val = parts.find((p) => p.type === type)?.value;
        return val ? Number.parseInt(val, 10) : 0;
      };
      const weekdayStr = parts.find((p) => p.type === 'weekday')?.value ?? 'Sun';
      const rawHour = getNum('hour');
      return {
        year: getNum('year'),
        month: getNum('month'),
        day: getNum('day'),
        weekdayIndex: WEEKDAY_MAP[weekdayStr] ?? date.getDay(),
        hour24: rawHour === 24 ? 0 : rawHour,
        minute: getNum('minute'),
        second: getNum('second'),
      };
    } catch {
      // Invalid timezone string: gracefully fall back to local Date components
    }
  }

  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    weekdayIndex: date.getDay(),
    hour24: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
  };
}

export function formatTimeParts(
  date: Date,
  config: SimpleClockCardConfig,
  hassTimeZone?: string
): FormattedTimeParts {
  const parts = getZonedDateParts(date, config.timezone || hassTimeZone);
  const timeMode = config.time_mode ?? DEFAULT_CONFIG.time_mode;
  const use24h = config.use_24h ?? DEFAULT_CONFIG.use_24h;
  const leadingZero = config.leading_zero ?? DEFAULT_CONFIG.leading_zero;
  const showAmPmCfg = config.show_ampm ?? DEFAULT_CONFIG.show_ampm;

  const isPm = parts.hour24 >= 12;
  let displayHour = parts.hour24;
  let ampm = '';

  if (!use24h) {
    displayHour = parts.hour24 % 12 || 12;
    ampm = isPm ? 'PM' : 'AM';
  }

  const hours = leadingZero ? String(displayHour).padStart(2, '0') : String(displayHour);
  const minutes = String(parts.minute).padStart(2, '0');
  const seconds = String(parts.second).padStart(2, '0');

  return {
    hours,
    minutes,
    seconds,
    ampm,
    showMinutes: timeMode === 'hm' || timeMode === 'hms',
    showSeconds: timeMode === 'hms',
    showAmPm: !use24h && showAmPmCfg,
  };
}

export function formatShortDate(parts: ZonedDateParts, config: SimpleClockCardConfig): string {
  const dd = String(parts.day).padStart(2, '0');
  const mm = String(parts.month).padStart(2, '0');
  const yearStr = config.short_year_2_digits
    ? String(parts.year).slice(-2).padStart(2, '0')
    : String(parts.year);
  const sep = config.short_date_separator ?? DEFAULT_CONFIG.short_date_separator;
  const order = config.short_date_order ?? DEFAULT_CONFIG.short_date_order;

  switch (order) {
    case 'MDY':
      return `${mm}${sep}${dd}${sep}${yearStr}`;
    case 'YMD':
      return `${yearStr}${sep}${mm}${sep}${dd}`;
    case 'DMY':
    default:
      return `${dd}${sep}${mm}${sep}${yearStr}`;
  }
}

function getWeekdayLabel(
  weekdayIndex: number,
  format: 'long' | 'short' | 'none',
  lang: ResolvedLanguage
): string {
  if (format === 'none') return '';
  const data = DATE_LOCALE_DATA[lang] ?? DATE_LOCALE_DATA.en;
  return format === 'short'
    ? data.weekdaysShort[weekdayIndex]
    : data.weekdaysLong[weekdayIndex];
}

function capitalizeFirst(value: string): string {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function formatLongDate(
  parts: ZonedDateParts,
  config: SimpleClockCardConfig,
  lang: ResolvedLanguage
): string {
  const data = DATE_LOCALE_DATA[lang] ?? DATE_LOCALE_DATA.en;
  const weekdayFmt = config.long_weekday_format ?? DEFAULT_CONFIG.long_weekday_format;
  const monthFmt = config.long_month_format ?? DEFAULT_CONFIG.long_month_format;
  const showYear = config.long_show_year ?? DEFAULT_CONFIG.long_show_year;
  const capitalize = config.capitalize_date ?? DEFAULT_CONFIG.capitalize_date;

  const weekday = getWeekdayLabel(parts.weekdayIndex, weekdayFmt, lang);
  const monthIndex = Math.max(0, Math.min(11, parts.month - 1));
  const month =
    monthFmt === 'short' ? data.monthsShort[monthIndex] : data.monthsLong[monthIndex];
  const day = parts.day;
  const year = parts.year;

  let formatted = '';

  switch (lang) {
    case 'es': {
      if (monthFmt === 'long') {
        const datePart = showYear ? `${day} de ${month} de ${year}` : `${day} de ${month}`;
        formatted = weekday ? `${weekday}, ${datePart}` : datePart;
      } else {
        const datePart = showYear ? `${day} ${month} ${year}` : `${day} ${month}`;
        formatted = weekday ? `${weekday}, ${datePart}` : datePart;
      }
      break;
    }

    case 'pt':
    case 'pt-BR': {
      if (monthFmt === 'long') {
        const datePart = showYear ? `${day} de ${month} de ${year}` : `${day} de ${month}`;
        formatted = weekday ? `${weekday}, ${datePart}` : datePart;
      } else {
        const datePart = showYear ? `${day} ${month} ${year}` : `${day} ${month}`;
        formatted = weekday ? `${weekday}, ${datePart}` : datePart;
      }
      break;
    }

    case 'it': {
      const datePart = showYear ? `${day} ${month} ${year}` : `${day} ${month}`;
      formatted = weekday ? `${weekday} ${datePart}` : datePart;
      break;
    }

    case 'fr': {
      const dayLabel = day === 1 ? '1er' : String(day);
      const datePart = showYear ? `${dayLabel} ${month} ${year}` : `${dayLabel} ${month}`;
      formatted = weekday ? `${weekday} ${datePart}` : datePart;
      break;
    }

    case 'de': {
      const datePart = showYear ? `${day}. ${month} ${year}` : `${day}. ${month}`;
      formatted = weekday ? `${weekday}, ${datePart}` : datePart;
      break;
    }

    case 'ru': {
      const baseMonth =
        monthFmt === 'short' ? data.monthsShort[monthIndex] : data.monthsLong[monthIndex];
      const yearSuffix = monthFmt === 'long' ? `${year} г.` : String(year);
      const datePart = showYear ? `${day} ${baseMonth} ${yearSuffix}` : `${day} ${baseMonth}`;
      formatted = weekday ? `${weekday}, ${datePart}` : datePart;
      break;
    }

    case 'zh-Hans': {
      const datePart = showYear ? `${year}年${parts.month}月${day}日` : `${parts.month}月${day}日`;
      formatted = weekday ? `${datePart} ${weekday}` : datePart;
      break;
    }

    case 'en':
    default: {
      const order = config.short_date_order ?? DEFAULT_CONFIG.short_date_order;
      let datePart = '';
      if (order === 'DMY') {
        datePart = showYear ? `${day} ${month} ${year}` : `${day} ${month}`;
      } else {
        datePart = showYear ? `${month} ${day}, ${year}` : `${month} ${day}`;
      }
      formatted = weekday ? `${weekday}, ${datePart}` : datePart;
      break;
    }
  }

  return capitalize ? capitalizeFirst(formatted) : formatted;
}

export function formatDateString(
  date: Date,
  config: SimpleClockCardConfig,
  lang: ResolvedLanguage,
  hassTimeZone?: string
): string {
  const parts = getZonedDateParts(date, config.timezone || hassTimeZone);
  const formatType = config.date_format_type ?? DEFAULT_CONFIG.date_format_type;

  if (formatType === 'short') {
    return formatShortDate(parts, config);
  }

  if (formatType === 'both') {
    const weekdayFmt = config.long_weekday_format ?? DEFAULT_CONFIG.long_weekday_format;
    const weekday = getWeekdayLabel(parts.weekdayIndex, weekdayFmt, lang);
    const shortDate = formatShortDate(parts, config);
    if (!weekday) return shortDate;
    const combined =
      lang === 'zh-Hans' ? `${shortDate} ${weekday}` : `${weekday}, ${shortDate}`;
    const capitalize = config.capitalize_date ?? DEFAULT_CONFIG.capitalize_date;
    return capitalize ? capitalizeFirst(combined) : combined;
  }

  return formatLongDate(parts, config, lang);
}

export function parseColorToRgb(color?: ColorValue): [number, number, number] | null {
  if (color === undefined || color === null) return null;

  if (Array.isArray(color)) {
    if (color.length >= 3) {
      const r = clampByte(Number(color[0]));
      const g = clampByte(Number(color[1]));
      const b = clampByte(Number(color[2]));
      return [r, g, b];
    }
    return null;
  }

  if (typeof color === 'string') {
    const trimmed = color.trim();
    if (!trimmed) return null;

    // Hex #RGB or #RRGGBB
    const hexMatch = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(trimmed);
    if (hexMatch) {
      const hex = hexMatch[1];
      if (hex.length === 3) {
        return [
          parseInt(hex[0] + hex[0], 16),
          parseInt(hex[1] + hex[1], 16),
          parseInt(hex[2] + hex[2], 16),
        ];
      }
      return [
        parseInt(hex.slice(0, 2), 16),
        parseInt(hex.slice(2, 4), 16),
        parseInt(hex.slice(4, 6), 16),
      ];
    }

    // rgb(r, g, b) or rgba(r, g, b, a)
    const rgbMatch = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i.exec(trimmed);
    if (rgbMatch) {
      return [
        clampByte(Number(rgbMatch[1])),
        clampByte(Number(rgbMatch[2])),
        clampByte(Number(rgbMatch[3])),
      ];
    }
  }

  return null;
}

function clampByte(n: number): number {
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(255, Math.round(n)));
}

export function colorToCss(color?: ColorValue): string | undefined {
  if (color === undefined || color === null) return undefined;
  const rgb = parseColorToRgb(color);
  if (rgb) {
    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
  }
  if (typeof color === 'string' && color.trim()) {
    return color.trim();
  }
  return undefined;
}

export function computeCardBackground(
  backgroundColor?: ColorValue,
  opacityPercent = 100
): string | undefined {
  const clampedOpacity = Math.max(0, Math.min(100, Number(opacityPercent ?? 100)));
  if (clampedOpacity === 0) {
    return 'transparent';
  }

  const alpha = Number((clampedOpacity / 100).toFixed(2));
  const rgb = parseColorToRgb(backgroundColor);

  if (rgb) {
    if (clampedOpacity === 100) {
      return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    }
    return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
  }

  if (typeof backgroundColor === 'string' && backgroundColor.trim()) {
    const trimmed = backgroundColor.trim();
    if (clampedOpacity === 100) {
      return trimmed;
    }
    return `color-mix(in srgb, ${trimmed} ${clampedOpacity}%, transparent)`;
  }

  if (clampedOpacity < 100) {
    return `color-mix(in srgb, var(--ha-card-background, var(--card-background-color, #ffffff)) ${clampedOpacity}%, transparent)`;
  }

  return undefined;
}

export function getFontFamilyCss(fontFamily?: FontFamilyOption): string | undefined {
  switch (fontFamily) {
    case 'sans-serif':
      return 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    case 'serif':
      return 'Georgia, "Times New Roman", Times, serif';
    case 'monospace':
      return '"JetBrains Mono", "Fira Code", "SFMono-Regular", Consolas, monospace';
    case 'digital':
      return '"DIN Alternate", "Roboto Condensed", "Segoe UI", system-ui, sans-serif';
    case 'rounded':
      return '"SF Pro Rounded", "Nunito", "Quicksand", system-ui, sans-serif';
    case 'inherit':
    default:
      return undefined;
  }
}

export function inferDefaultIcon(entityId: string, stateObj?: HassEntity): string {
  const attrIcon = stateObj?.attributes?.icon;
  if (typeof attrIcon === 'string' && attrIcon.trim()) {
    return attrIcon.trim();
  }

  const domain = entityId.split('.')[0];
  const deviceClass = String(stateObj?.attributes?.device_class ?? '').toLowerCase();

  switch (deviceClass) {
    case 'temperature':
      return 'mdi:thermometer';
    case 'humidity':
      return 'mdi:water-percent';
    case 'battery':
      return 'mdi:battery';
    case 'power':
      return 'mdi:flash';
    case 'energy':
      return 'mdi:lightning-bolt';
    case 'pressure':
      return 'mdi:gauge';
    case 'illuminance':
      return 'mdi:brightness-6';
    case 'moisture':
      return 'mdi:water';
    case 'wind_speed':
      return 'mdi:weather-windy';
    default:
      break;
  }

  switch (domain) {
    case 'weather':
      return 'mdi:weather-partly-cloudy';
    case 'sun':
      return 'mdi:white-balance-sunny';
    case 'person':
    case 'device_tracker':
      return 'mdi:account';
    case 'climate':
      return 'mdi:thermostat';
    case 'light':
      return 'mdi:lightbulb';
    case 'switch':
      return 'mdi:toggle-switch';
    case 'lock':
      return 'mdi:lock';
    case 'alarm_control_panel':
      return 'mdi:shield-home';
    case 'binary_sensor':
      return 'mdi:radiobox-marked';
    case 'calendar':
      return 'mdi:calendar';
    default:
      return 'mdi:eye';
  }
}

function inferAttributeUnit(
  attrName: string,
  stateObj: HassEntity,
  hass?: HomeAssistant
): string {
  const attrs = stateObj.attributes ?? {};
  switch (attrName) {
    case 'temperature':
    case 'apparent_temperature':
    case 'dew_point':
    case 'current_temperature':
      return (
        (typeof attrs.temperature_unit === 'string' && attrs.temperature_unit) ||
        hass?.config?.unit_system?.temperature ||
        ''
      );
    case 'humidity':
    case 'current_humidity':
    case 'battery':
    case 'battery_level':
    case 'cloud_coverage':
      return '%';
    case 'wind_speed':
    case 'wind_gust_speed':
      return (
        (typeof attrs.wind_speed_unit === 'string' && attrs.wind_speed_unit) ||
        hass?.config?.unit_system?.wind_speed ||
        ''
      );
    case 'pressure':
      return (
        (typeof attrs.pressure_unit === 'string' && attrs.pressure_unit) ||
        hass?.config?.unit_system?.pressure ||
        ''
      );
    case 'visibility':
      return (
        (typeof attrs.visibility_unit === 'string' && attrs.visibility_unit) || ''
      );
    default:
      return '';
  }
}

export function resolveEntityDisplay(
  hass: HomeAssistant | undefined,
  slot: EntitySlotConfig | undefined,
  lang: ResolvedLanguage
): ResolvedEntityDisplay | null {
  const entityId = slot?.entity?.trim();
  if (!entityId) return null;

  const stateObj = hass?.states?.[entityId];
  const showIcon = slot?.show_icon ?? true;
  const showName = slot?.show_name ?? false;
  const showUnit = slot?.show_unit ?? true;
  const unavailableText = localize('unavailable', lang);

  if (!stateObj) {
    return {
      entityId,
      stateObj: undefined,
      icon: showIcon ? slot?.icon?.trim() || 'mdi:help-circle-outline' : '',
      name: showName ? slot?.name?.trim() || entityId : '',
      value: unavailableText,
      unit: '',
      available: false,
    };
  }

  const friendlyName =
    typeof stateObj.attributes?.friendly_name === 'string'
      ? stateObj.attributes.friendly_name
      : entityId;
  const name = showName ? slot?.name?.trim() || friendlyName : '';
  const icon = showIcon ? slot?.icon?.trim() || inferDefaultIcon(entityId, stateObj) : '';

  const attrName = slot?.attribute?.trim();
  if (attrName) {
    const rawAttr = stateObj.attributes?.[attrName];
    if (rawAttr === undefined || rawAttr === null) {
      return {
        entityId,
        stateObj,
        icon,
        name,
        value: unavailableText,
        unit: '',
        available: false,
      };
    }

    let value: string;
    if (Array.isArray(rawAttr)) {
      value = rawAttr.join(', ');
    } else if (typeof rawAttr === 'object') {
      value = JSON.stringify(rawAttr);
    } else {
      value = String(rawAttr);
    }

    let unit = '';
    if (showUnit) {
      if (slot?.unit !== undefined && slot.unit.trim() !== '') {
        unit = slot.unit.trim();
      } else if (typeof rawAttr === 'number' || !Number.isNaN(Number(rawAttr))) {
        unit = inferAttributeUnit(attrName, stateObj, hass);
      }
    }

    return {
      entityId,
      stateObj,
      icon,
      name,
      value,
      unit,
      available: true,
    };
  }

  // Main entity state
  const rawState = stateObj.state;
  const isSpecialState = rawState === 'unavailable' || rawState === 'unknown';

  if (isSpecialState) {
    return {
      entityId,
      stateObj,
      icon,
      name,
      value: rawState === 'unavailable' ? unavailableText : rawState,
      unit: '',
      available: false,
    };
  }

  // If custom unit is omitted and unit display is enabled, allow HA's formatEntityState when available
  const customUnit = slot?.unit?.trim();
  if (showUnit && !customUnit && typeof hass?.formatEntityState === 'function') {
    return {
      entityId,
      stateObj,
      icon,
      name,
      value: hass.formatEntityState(stateObj),
      unit: '',
      available: true,
    };
  }

  const stateUnit =
    typeof stateObj.attributes?.unit_of_measurement === 'string'
      ? stateObj.attributes.unit_of_measurement
      : '';
  const unit = showUnit ? customUnit || stateUnit : '';

  return {
    entityId,
    stateObj,
    icon,
    name,
    value: rawState,
    unit,
    available: true,
  };
}
