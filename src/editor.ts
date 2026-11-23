import { LitElement, html, css, TemplateResult, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  ActionConfig,
  ActionType,
  ColorValue,
  DEFAULT_CONFIG,
  DEFAULT_ENTITY_SLOT,
  EntitySlotConfig,
  HomeAssistant,
  LovelaceCardEditor,
  ResolvedLanguage,
  SimpleClockCardConfig,
} from './types';
import {
  SUPPORTED_LANGUAGES,
  TranslationStrings,
  localize,
  resolveLanguage,
} from './localize/localize';
import { parseColorToRgb } from './utils/date-time';

type EntitySlotKey = 'entity_1' | 'entity_2' | 'entity_3';

@customElement('simple-clock-card-editor')
export class SimpleClockCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config: SimpleClockCardConfig = { ...DEFAULT_CONFIG };
  @state() private _helpersLoaded = false;

  public setConfig(config: SimpleClockCardConfig): void {
    this._config = {
      ...DEFAULT_CONFIG,
      ...config,
    };
  }

  public connectedCallback(): void {
    super.connectedCallback();
    void this._ensureHaComponents();
  }

  private async _ensureHaComponents(): Promise<void> {
    if (
      customElements.get('ha-selector') &&
      customElements.get('ha-expansion-panel')
    ) {
      this._helpersLoaded = true;
      return;
    }

    try {
      const win = window as unknown as {
        loadCardHelpers?: () => Promise<{
          createCardElement: (cfg: Record<string, unknown>) => Promise<{
            constructor?: { getConfigElement?: () => Promise<unknown> };
          }>;
        }>;
      };
      const helpers = await win.loadCardHelpers?.();
      if (helpers) {
        const entitiesCard = await helpers.createCardElement({
          type: 'entities',
          entities: [],
        });
        await entitiesCard?.constructor?.getConfigElement?.();
      }
    } catch {
      // Ignore if running outside Home Assistant environment
    } finally {
      this._helpersLoaded = true;
      this.requestUpdate();
    }
  }

  private get _editorLang(): ResolvedLanguage {
    const hassLang = this.hass?.locale?.language || this.hass?.language;
    return resolveLanguage('auto', hassLang);
  }

  private _t(key: keyof TranslationStrings): string {
    return localize(key, this._editorLang);
  }

  private _emitConfig(newConfig: SimpleClockCardConfig): void {
    this._config = newConfig;
    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config: newConfig },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _updateField<K extends keyof SimpleClockCardConfig>(
    key: K,
    value: SimpleClockCardConfig[K]
  ): void {
    const updated: SimpleClockCardConfig = { ...this._config };
    if (value === undefined || value === '') {
      delete updated[key];
    } else {
      updated[key] = value;
    }
    this._emitConfig(updated);
  }

  private _updateEntitySlot(
    slotKey: EntitySlotKey,
    field: keyof EntitySlotConfig,
    value: unknown
  ): void {
    const currentSlot: EntitySlotConfig = { ...(this._config[slotKey] ?? {}) };
    const updatedSlot: EntitySlotConfig = { ...currentSlot };

    if (field === 'entity') {
      const nextEntity = typeof value === 'string' ? value.trim() : '';
      if (!nextEntity) {
        delete updatedSlot.entity;
        delete updatedSlot.attribute;
      } else {
        if (currentSlot.entity !== nextEntity) {
          delete updatedSlot.attribute;
        }
        updatedSlot.entity = nextEntity;
      }
    } else if (value === undefined || value === '') {
      delete updatedSlot[field];
    } else {
      (updatedSlot as Record<string, unknown>)[field] = value;
    }

    const updatedConfig: SimpleClockCardConfig = { ...this._config };
    if (Object.keys(updatedSlot).length === 0) {
      delete updatedConfig[slotKey];
    } else {
      updatedConfig[slotKey] = updatedSlot;
    }

    this._emitConfig(updatedConfig);
  }

  private _renderSelector(
    label: string,
    selector: Record<string, unknown>,
    value: unknown,
    onChange: (val: unknown) => void,
    helper?: string
  ): TemplateResult {
    if (customElements.get('ha-selector')) {
      return html`
        <div class="field-row">
          <ha-selector
            .hass=${this.hass}
            .selector=${selector}
            .value=${value}
            .label=${label}
            .helper=${helper}
            @value-changed=${(ev: CustomEvent<{ value: unknown }>) => {
              ev.stopPropagation();
              onChange(ev.detail.value);
            }}
          ></ha-selector>
        </div>
      `;
    }

    return this._renderFallbackInput(label, selector, value, onChange, helper);
  }

  private _renderFallbackInput(
    label: string,
    selector: Record<string, unknown>,
    value: unknown,
    onChange: (val: unknown) => void,
    helper?: string
  ): TemplateResult {
    if ('boolean' in selector) {
      return html`
        <label class="fallback-switch">
          <span>${label}</span>
          <input
            type="checkbox"
            .checked=${Boolean(value)}
            @change=${(e: Event) => onChange((e.target as HTMLInputElement).checked)}
          />
        </label>
      `;
    }

    if ('select' in selector) {
      const selCfg = selector.select as {
        options: Array<{ value: string; label: string }>;
      };
      return html`
        <label class="fallback-field">
          <span>${label}</span>
          <select
            .value=${String(value ?? '')}
            @change=${(e: Event) => onChange((e.target as HTMLSelectElement).value)}
          >
            ${selCfg.options.map(
              (opt) =>
                html`<option value=${opt.value} ?selected=${value === opt.value}>
                  ${opt.label}
                </option>`
            )}
          </select>
        </label>
      `;
    }

    if ('number' in selector) {
      const numCfg = selector.number as {
        min?: number;
        max?: number;
        step?: number;
        unit_of_measurement?: string;
      };
      return html`
        <label class="fallback-field">
          <span>
            ${label}: <strong>${value ?? numCfg.min ?? 0}${numCfg.unit_of_measurement ?? ''}</strong>
          </span>
          <input
            type="range"
            min=${numCfg.min ?? 0}
            max=${numCfg.max ?? 100}
            step=${numCfg.step ?? 1}
            .value=${String(value ?? numCfg.min ?? 0)}
            @input=${(e: Event) =>
              onChange(Number((e.target as HTMLInputElement).value))}
          />
          ${helper ? html`<small class="helper">${helper}</small>` : nothing}
        </label>
      `;
    }

    if ('color_rgb' in selector) {
      const rgb = parseColorToRgb(value as string | number[] | undefined);
      const hex = rgb
        ? `#${rgb.map((c) => c.toString(16).padStart(2, '0')).join('')}`
        : '#000000';
      return html`
        <label class="fallback-field">
          <span>${label}</span>
          <input
            type="color"
            .value=${hex}
            @input=${(e: Event) => {
              const parsed = parseColorToRgb((e.target as HTMLInputElement).value);
              onChange(parsed ?? undefined);
            }}
          />
        </label>
      `;
    }

    if ('ui_action' in selector) {
      const uiCfg = selector.ui_action as { default_action?: ActionType };
      const currentAction =
        (value as ActionConfig | undefined)?.action ?? uiCfg.default_action ?? 'none';
      const actionOptions: Array<{ value: string; label: string }> = [
        { value: 'none', label: this._t('action_none') },
        { value: 'more-info', label: this._t('action_more_info') },
        { value: 'toggle', label: this._t('action_toggle') },
        { value: 'navigate', label: this._t('action_navigate') },
        { value: 'url', label: this._t('action_url') },
        { value: 'perform-action', label: this._t('action_perform_action') },
        { value: 'assist', label: this._t('action_assist') },
      ];
      return html`
        <label class="fallback-field">
          <span>${label}</span>
          <select
            .value=${currentAction}
            @change=${(e: Event) => {
              const selected = (e.target as HTMLSelectElement).value;
              onChange(selected === uiCfg.default_action ? undefined : { action: selected });
            }}
          >
            ${actionOptions.map(
              (opt) =>
                html`<option value=${opt.value} ?selected=${currentAction === opt.value}>
                  ${opt.label}
                </option>`
            )}
          </select>
        </label>
      `;
    }

    return html`
      <label class="fallback-field">
        <span>${label}</span>
        <input
          type="text"
          .value=${String(value ?? '')}
          @change=${(e: Event) => onChange((e.target as HTMLInputElement).value)}
        />
        ${helper ? html`<small class="helper">${helper}</small>` : nothing}
      </label>
    `;
  }

  private _renderColorPicker(
    label: string,
    rawValue: ColorValue | undefined,
    onChange: (val: ColorValue | undefined) => void
  ): TemplateResult {
    const rgbValue = parseColorToRgb(rawValue) ?? undefined;
    const hasCustomValue = rawValue !== undefined && rawValue !== '';

    return html`
      <div class="color-row">
        <div class="color-selector">
          ${this._renderSelector(label, { color_rgb: {} }, rgbValue, (val) => {
            onChange(val as number[] | undefined);
          })}
        </div>
        ${hasCustomValue
          ? html`
              <button
                type="button"
                class="reset-btn"
                title=${this._t('reset_default')}
                @click=${() => onChange(undefined)}
              >
                ↺
              </button>
            `
          : nothing}
      </div>
    `;
  }

  private _renderColorField(
    key: 'clock_color' | 'date_color' | 'entity_color' | 'entity_icon_color' | 'background_color',
    label: string
  ): TemplateResult {
    return this._renderColorPicker(label, this._config[key], (val) =>
      this._updateField(key, val)
    );
  }

  private _renderActionSelector(
    label: string,
    value: ActionConfig | undefined,
    defaultAction: ActionType,
    onChange: (val: ActionConfig | undefined) => void
  ): TemplateResult {
    return this._renderSelector(
      label,
      { ui_action: { default_action: defaultAction } },
      value,
      (val) => onChange((val as ActionConfig | undefined) ?? undefined)
    );
  }

  private _renderPanel(
    title: string,
    content: TemplateResult,
    expanded = false
  ): TemplateResult {
    if (customElements.get('ha-expansion-panel')) {
      return html`
        <ha-expansion-panel outlined .expanded=${expanded}>
          <span slot="header" class="panel-header">${title}</span>
          <div class="panel-content">${content}</div>
        </ha-expansion-panel>
      `;
    }

    return html`
      <details class="fallback-panel" ?open=${expanded}>
        <summary class="panel-header">${title}</summary>
        <div class="panel-content">${content}</div>
      </details>
    `;
  }

  private _renderClockSection(): TemplateResult {
    const timeMode = this._config.time_mode ?? DEFAULT_CONFIG.time_mode;
    const use24h = this._config.use_24h ?? DEFAULT_CONFIG.use_24h;
    const showAmPm = this._config.show_ampm ?? DEFAULT_CONFIG.show_ampm;

    return this._renderPanel(
      this._t('section_clock'),
      html`
        ${this._renderSelector(
          this._t('time_mode'),
          {
            select: {
              mode: 'dropdown',
              options: [
                { value: 'h', label: this._t('time_mode_h') },
                { value: 'hm', label: this._t('time_mode_hm') },
                { value: 'hms', label: this._t('time_mode_hms') },
              ],
            },
          },
          timeMode,
          (val) => this._updateField('time_mode', val as SimpleClockCardConfig['time_mode'])
        )}

        <div class="two-col">
          ${this._renderSelector(
            this._t('use_24h'),
            { boolean: {} },
            use24h,
            (val) => this._updateField('use_24h', Boolean(val))
          )}
          ${this._renderSelector(
            this._t('leading_zero'),
            { boolean: {} },
            this._config.leading_zero ?? DEFAULT_CONFIG.leading_zero,
            (val) => this._updateField('leading_zero', Boolean(val))
          )}
        </div>

        ${!use24h
          ? html`
              <div class="two-col">
                ${this._renderSelector(
                  this._t('show_ampm'),
                  { boolean: {} },
                  showAmPm,
                  (val) => this._updateField('show_ampm', Boolean(val))
                )}
                ${showAmPm
                  ? this._renderSelector(
                      this._t('ampm_position'),
                      {
                        select: {
                          mode: 'dropdown',
                          options: [
                            { value: 'right', label: this._t('ampm_right') },
                            { value: 'superscript', label: this._t('ampm_superscript') },
                            { value: 'subscript', label: this._t('ampm_subscript') },
                            { value: 'below', label: this._t('ampm_below') },
                          ],
                        },
                      },
                      this._config.ampm_position ?? DEFAULT_CONFIG.ampm_position,
                      (val) =>
                        this._updateField(
                          'ampm_position',
                          val as SimpleClockCardConfig['ampm_position']
                        )
                    )
                  : nothing}
              </div>
            `
          : nothing}

        ${timeMode !== 'h'
          ? this._renderSelector(
              this._t('blink_separator'),
              { boolean: {} },
              this._config.blink_separator ?? DEFAULT_CONFIG.blink_separator,
              (val) => this._updateField('blink_separator', Boolean(val))
            )
          : nothing}

        ${timeMode === 'hms'
          ? this._renderSelector(
              this._t('seconds_style'),
              {
                select: {
                  mode: 'dropdown',
                  options: [
                    { value: 'inline', label: this._t('seconds_inline') },
                    { value: 'superscript', label: this._t('seconds_superscript') },
                    { value: 'subscript', label: this._t('seconds_subscript') },
                  ],
                },
              },
              this._config.seconds_style ?? DEFAULT_CONFIG.seconds_style,
              (val) =>
                this._updateField(
                  'seconds_style',
                  val as SimpleClockCardConfig['seconds_style']
                )
            )
          : nothing}

        ${this._renderSelector(
          this._t('timezone'),
          { text: {} },
          this._config.timezone ?? '',
          (val) => this._updateField('timezone', (val as string) || undefined),
          this._t('timezone_helper')
        )}
      `,
      true
    );
  }

  private _renderDateLanguageSection(): TemplateResult {
    const showDate = this._config.show_date ?? DEFAULT_CONFIG.show_date;
    const dateFormatType = this._config.date_format_type ?? DEFAULT_CONFIG.date_format_type;

    const languageOptions = [
      { value: 'auto', label: this._t('language_auto') },
      ...SUPPORTED_LANGUAGES.map((l) => ({ value: l.value, label: l.nativeLabel })),
    ];

    return this._renderPanel(
      this._t('section_date_language'),
      html`
        ${this._renderSelector(
          this._t('language'),
          {
            select: {
              mode: 'dropdown',
              options: languageOptions,
            },
          },
          this._config.language ?? DEFAULT_CONFIG.language,
          (val) => this._updateField('language', val as SimpleClockCardConfig['language'])
        )}

        ${this._renderSelector(
          this._t('show_date'),
          { boolean: {} },
          showDate,
          (val) => this._updateField('show_date', Boolean(val))
        )}

        ${showDate
          ? html`
              <div class="two-col">
                ${this._renderSelector(
                  this._t('date_position'),
                  {
                    select: {
                      mode: 'dropdown',
                      options: [
                        { value: 'top', label: this._t('position_top') },
                        { value: 'bottom', label: this._t('position_bottom') },
                      ],
                    },
                  },
                  this._config.date_position ?? DEFAULT_CONFIG.date_position,
                  (val) =>
                    this._updateField(
                      'date_position',
                      val as SimpleClockCardConfig['date_position']
                    )
                )}

                ${this._renderSelector(
                  this._t('date_format_type'),
                  {
                    select: {
                      mode: 'dropdown',
                      options: [
                        { value: 'short', label: this._t('date_format_short') },
                        { value: 'long', label: this._t('date_format_long') },
                        { value: 'both', label: this._t('date_format_both') },
                      ],
                    },
                  },
                  dateFormatType,
                  (val) =>
                    this._updateField(
                      'date_format_type',
                      val as SimpleClockCardConfig['date_format_type']
                    )
                )}
              </div>

              ${dateFormatType === 'short' || dateFormatType === 'both'
                ? html`
                    <div class="two-col">
                      ${this._renderSelector(
                        this._t('short_date_order'),
                        {
                          select: {
                            mode: 'dropdown',
                            options: [
                              { value: 'DMY', label: this._t('order_dmy') },
                              { value: 'MDY', label: this._t('order_mdy') },
                              { value: 'YMD', label: this._t('order_ymd') },
                            ],
                          },
                        },
                        this._config.short_date_order ?? DEFAULT_CONFIG.short_date_order,
                        (val) =>
                          this._updateField(
                            'short_date_order',
                            val as SimpleClockCardConfig['short_date_order']
                          )
                      )}

                      ${this._renderSelector(
                        this._t('short_date_separator'),
                        {
                          select: {
                            mode: 'dropdown',
                            options: [
                              { value: '/', label: '/' },
                              { value: '-', label: '-' },
                              { value: '.', label: '.' },
                            ],
                          },
                        },
                        this._config.short_date_separator ?? DEFAULT_CONFIG.short_date_separator,
                        (val) =>
                          this._updateField(
                            'short_date_separator',
                            val as SimpleClockCardConfig['short_date_separator']
                          )
                      )}
                    </div>

                    ${this._renderSelector(
                      this._t('short_year_2_digits'),
                      { boolean: {} },
                      this._config.short_year_2_digits ?? DEFAULT_CONFIG.short_year_2_digits,
                      (val) => this._updateField('short_year_2_digits', Boolean(val))
                    )}
                  `
                : nothing}

              ${dateFormatType === 'long' || dateFormatType === 'both'
                ? html`
                    <div class="two-col">
                      ${this._renderSelector(
                        this._t('long_weekday_format'),
                        {
                          select: {
                            mode: 'dropdown',
                            options: [
                              { value: 'long', label: this._t('weekday_long') },
                              { value: 'short', label: this._t('weekday_short') },
                              { value: 'none', label: this._t('weekday_none') },
                            ],
                          },
                        },
                        this._config.long_weekday_format ?? DEFAULT_CONFIG.long_weekday_format,
                        (val) =>
                          this._updateField(
                            'long_weekday_format',
                            val as SimpleClockCardConfig['long_weekday_format']
                          )
                      )}

                      ${dateFormatType === 'long'
                        ? this._renderSelector(
                            this._t('long_month_format'),
                            {
                              select: {
                                mode: 'dropdown',
                                options: [
                                  { value: 'long', label: this._t('month_long') },
                                  { value: 'short', label: this._t('month_short') },
                                ],
                              },
                            },
                            this._config.long_month_format ?? DEFAULT_CONFIG.long_month_format,
                            (val) =>
                              this._updateField(
                                'long_month_format',
                                val as SimpleClockCardConfig['long_month_format']
                              )
                          )
                        : nothing}
                    </div>
                  `
                : nothing}

              ${dateFormatType === 'long'
                ? html`
                    <div class="two-col">
                      ${this._renderSelector(
                        this._t('long_show_year'),
                        { boolean: {} },
                        this._config.long_show_year ?? DEFAULT_CONFIG.long_show_year,
                        (val) => this._updateField('long_show_year', Boolean(val))
                      )}
                      ${this._renderSelector(
                        this._t('capitalize_date'),
                        { boolean: {} },
                        this._config.capitalize_date ?? DEFAULT_CONFIG.capitalize_date,
                        (val) => this._updateField('capitalize_date', Boolean(val))
                      )}
                    </div>
                  `
                : dateFormatType === 'both'
                  ? this._renderSelector(
                      this._t('capitalize_date'),
                      { boolean: {} },
                      this._config.capitalize_date ?? DEFAULT_CONFIG.capitalize_date,
                      (val) => this._updateField('capitalize_date', Boolean(val))
                    )
                  : nothing}
            `
          : nothing}
      `
    );
  }

  private _renderEntitySlot(slotKey: EntitySlotKey, index: number): TemplateResult {
    const slot = this._config[slotKey] ?? {};
    const titleSuffix = slot.entity ? ` (${slot.entity})` : '';
    const panelTitle = `${this._t('entity_slot')} ${index}${titleSuffix}`;

    return this._renderPanel(
      panelTitle,
      html`
        ${this._renderSelector(
          this._t('entity'),
          { entity: {} },
          slot.entity ?? '',
          (val) => this._updateEntitySlot(slotKey, 'entity', val)
        )}

        ${slot.entity
          ? html`
              ${this._renderSelector(
                this._t('attribute'),
                { attribute: { entity_id: slot.entity } },
                slot.attribute ?? '',
                (val) => this._updateEntitySlot(slotKey, 'attribute', val),
                this._t('attribute_helper')
              )}

              <div class="two-col">
                ${this._renderSelector(
                  this._t('custom_name'),
                  { text: {} },
                  slot.name ?? '',
                  (val) => this._updateEntitySlot(slotKey, 'name', val)
                )}
                ${this._renderSelector(
                  this._t('custom_unit'),
                  { text: {} },
                  slot.unit ?? '',
                  (val) => this._updateEntitySlot(slotKey, 'unit', val)
                )}
              </div>

              ${this._renderSelector(
                this._t('custom_icon'),
                { icon: {} },
                slot.icon ?? '',
                (val) => this._updateEntitySlot(slotKey, 'icon', val)
              )}

              ${this._renderColorPicker(
                this._t('entity_slot_icon_color'),
                slot.icon_color,
                (val) => this._updateEntitySlot(slotKey, 'icon_color', val)
              )}

              <div class="three-col">
                ${this._renderSelector(
                  this._t('show_icon'),
                  { boolean: {} },
                  slot.show_icon ?? DEFAULT_ENTITY_SLOT.show_icon,
                  (val) => this._updateEntitySlot(slotKey, 'show_icon', Boolean(val))
                )}
                ${this._renderSelector(
                  this._t('show_name'),
                  { boolean: {} },
                  slot.show_name ?? DEFAULT_ENTITY_SLOT.show_name,
                  (val) => this._updateEntitySlot(slotKey, 'show_name', Boolean(val))
                )}
                ${this._renderSelector(
                  this._t('show_unit'),
                  { boolean: {} },
                  slot.show_unit ?? DEFAULT_ENTITY_SLOT.show_unit,
                  (val) => this._updateEntitySlot(slotKey, 'show_unit', Boolean(val))
                )}
              </div>

              ${this._renderActionSelector(
                this._t('tap_action'),
                slot.tap_action,
                'more-info',
                (val) => this._updateEntitySlot(slotKey, 'tap_action', val)
              )}
              ${this._renderActionSelector(
                this._t('double_tap_action'),
                slot.double_tap_action,
                'none',
                (val) => this._updateEntitySlot(slotKey, 'double_tap_action', val)
              )}
              ${this._renderActionSelector(
                this._t('hold_action'),
                slot.hold_action,
                'none',
                (val) => this._updateEntitySlot(slotKey, 'hold_action', val)
              )}
            `
          : nothing}
      `
    );
  }

  private _renderEntitiesSection(): TemplateResult {
    const showEntities = this._config.show_entities ?? DEFAULT_CONFIG.show_entities;

    return this._renderPanel(
      this._t('section_entities'),
      html`
        ${this._renderSelector(
          this._t('show_entities'),
          { boolean: {} },
          showEntities,
          (val) => this._updateField('show_entities', Boolean(val))
        )}

        ${showEntities
          ? html`
              ${this._renderSelector(
                this._t('entities_position'),
                {
                  select: {
                    mode: 'dropdown',
                    options: [
                      { value: 'bottom', label: this._t('position_bottom') },
                      { value: 'top', label: this._t('position_top') },
                    ],
                  },
                },
                this._config.entities_position ?? DEFAULT_CONFIG.entities_position,
                (val) =>
                  this._updateField(
                    'entities_position',
                    val as SimpleClockCardConfig['entities_position']
                  )
              )}

              <div class="nested-panels">
                ${this._renderEntitySlot('entity_1', 1)}
                ${this._renderEntitySlot('entity_2', 2)}
                ${this._renderEntitySlot('entity_3', 3)}
              </div>
            `
          : nothing}
      `
    );
  }

  private _renderSizingTypographySection(): TemplateResult {
    return this._renderPanel(
      this._t('section_sizing_typography'),
      html`
        ${this._renderSelector(
          this._t('clock_font_size'),
          { number: { min: 16, max: 160, step: 1, mode: 'slider', unit_of_measurement: 'px' } },
          this._config.clock_font_size ?? DEFAULT_CONFIG.clock_font_size,
          (val) => this._updateField('clock_font_size', Number(val))
        )}

        ${this._renderSelector(
          this._t('seconds_font_size'),
          { number: { min: 10, max: 80, step: 1, mode: 'slider', unit_of_measurement: 'px' } },
          this._config.seconds_font_size ?? DEFAULT_CONFIG.seconds_font_size,
          (val) => this._updateField('seconds_font_size', Number(val))
        )}

        ${this._renderSelector(
          this._t('date_font_size'),
          { number: { min: 10, max: 60, step: 1, mode: 'slider', unit_of_measurement: 'px' } },
          this._config.date_font_size ?? DEFAULT_CONFIG.date_font_size,
          (val) => this._updateField('date_font_size', Number(val))
        )}

        ${this._renderSelector(
          this._t('entity_font_size'),
          { number: { min: 10, max: 40, step: 1, mode: 'slider', unit_of_measurement: 'px' } },
          this._config.entity_font_size ?? DEFAULT_CONFIG.entity_font_size,
          (val) => this._updateField('entity_font_size', Number(val))
        )}

        ${this._renderSelector(
          this._t('card_padding'),
          { number: { min: 0, max: 64, step: 1, mode: 'slider', unit_of_measurement: 'px' } },
          this._config.card_padding ?? DEFAULT_CONFIG.card_padding,
          (val) => this._updateField('card_padding', Number(val))
        )}

        ${this._renderSelector(
          this._t('card_min_height'),
          { number: { min: 0, max: 400, step: 4, mode: 'slider', unit_of_measurement: 'px' } },
          this._config.card_min_height ?? DEFAULT_CONFIG.card_min_height,
          (val) => this._updateField('card_min_height', Number(val)),
          this._t('card_min_height_helper')
        )}

        ${this._renderSelector(
          this._t('content_gap'),
          { number: { min: 0, max: 48, step: 1, mode: 'slider', unit_of_measurement: 'px' } },
          this._config.content_gap ?? DEFAULT_CONFIG.content_gap,
          (val) => this._updateField('content_gap', Number(val))
        )}

        <div class="two-col">
          ${this._renderSelector(
            this._t('text_align'),
            {
              select: {
                mode: 'dropdown',
                options: [
                  { value: 'left', label: this._t('align_left') },
                  { value: 'center', label: this._t('align_center') },
                  { value: 'right', label: this._t('align_right') },
                ],
              },
            },
            this._config.text_align ?? DEFAULT_CONFIG.text_align,
            (val) =>
              this._updateField('text_align', val as SimpleClockCardConfig['text_align'])
          )}

          ${this._renderSelector(
            this._t('font_weight'),
            {
              select: {
                mode: 'dropdown',
                options: [
                  { value: '200', label: '200 (Extra Light)' },
                  { value: '300', label: '300 (Light)' },
                  { value: '400', label: '400 (Normal)' },
                  { value: '500', label: '500 (Medium)' },
                  { value: '600', label: '600 (Semi Bold)' },
                  { value: '700', label: '700 (Bold)' },
                  { value: '800', label: '800 (Extra Bold)' },
                ],
              },
            },
            this._config.font_weight ?? DEFAULT_CONFIG.font_weight,
            (val) =>
              this._updateField('font_weight', val as SimpleClockCardConfig['font_weight'])
          )}
        </div>

        ${this._renderSelector(
          this._t('font_family'),
          {
            select: {
              mode: 'dropdown',
              options: [
                { value: 'inherit', label: this._t('font_inherit') },
                { value: 'sans-serif', label: this._t('font_sans') },
                { value: 'serif', label: this._t('font_serif') },
                { value: 'monospace', label: this._t('font_mono') },
                { value: 'digital', label: this._t('font_digital') },
                { value: 'rounded', label: this._t('font_rounded') },
              ],
            },
          },
          this._config.font_family ?? DEFAULT_CONFIG.font_family,
          (val) =>
            this._updateField('font_family', val as SimpleClockCardConfig['font_family'])
        )}
      `
    );
  }

  private _renderColorsTransparencySection(): TemplateResult {
    const hasCustomRadius = this._config.border_radius !== undefined;

    return this._renderPanel(
      this._t('section_colors_transparency'),
      html`
        ${this._renderColorField('clock_color', this._t('clock_color'))}
        ${this._renderColorField('date_color', this._t('date_color'))}
        ${this._renderColorField('entity_color', this._t('entity_color'))}
        ${this._renderColorField('entity_icon_color', this._t('entity_icon_color'))}
        ${this._renderColorField('background_color', this._t('background_color'))}

        ${this._renderSelector(
          this._t('background_opacity'),
          { number: { min: 0, max: 100, step: 1, mode: 'slider', unit_of_measurement: '%' } },
          this._config.background_opacity ?? DEFAULT_CONFIG.background_opacity,
          (val) => this._updateField('background_opacity', Number(val))
        )}

        ${this._renderSelector(
          this._t('backdrop_blur'),
          { number: { min: 0, max: 30, step: 1, mode: 'slider', unit_of_measurement: 'px' } },
          this._config.backdrop_blur ?? DEFAULT_CONFIG.backdrop_blur,
          (val) => this._updateField('backdrop_blur', Number(val))
        )}

        <div class="color-row">
          <div class="color-selector">
            ${this._renderSelector(
              this._t('border_radius'),
              { number: { min: 0, max: 48, step: 1, mode: 'slider', unit_of_measurement: 'px' } },
              this._config.border_radius ?? 12,
              (val) => this._updateField('border_radius', Number(val))
            )}
          </div>
          ${hasCustomRadius
            ? html`
                <button
                  type="button"
                  class="reset-btn"
                  title=${this._t('reset_default')}
                  @click=${() => this._updateField('border_radius', undefined)}
                >
                  ↺
                </button>
              `
            : nothing}
        </div>

        <div class="two-col">
          ${this._renderSelector(
            this._t('hide_border'),
            { boolean: {} },
            this._config.hide_border ?? DEFAULT_CONFIG.hide_border,
            (val) => this._updateField('hide_border', Boolean(val))
          )}
          ${this._renderSelector(
            this._t('hide_shadow'),
            { boolean: {} },
            this._config.hide_shadow ?? DEFAULT_CONFIG.hide_shadow,
            (val) => this._updateField('hide_shadow', Boolean(val))
          )}
        </div>
      `
    );
  }

  private _renderInteractionsSection(): TemplateResult {
    return this._renderPanel(
      this._t('section_interactions'),
      html`
        ${this._renderActionSelector(
          this._t('tap_action'),
          this._config.tap_action,
          'none',
          (val) => this._updateField('tap_action', val)
        )}
        ${this._renderActionSelector(
          this._t('double_tap_action'),
          this._config.double_tap_action,
          'none',
          (val) => this._updateField('double_tap_action', val)
        )}
        ${this._renderActionSelector(
          this._t('hold_action'),
          this._config.hold_action,
          'none',
          (val) => this._updateField('hold_action', val)
        )}
      `
    );
  }

  protected render(): TemplateResult {
    if (!this._config) {
      return html`${nothing}`;
    }

    // Touch _helpersLoaded so Lit tracks re-render once HA components finish lazy-loading
    void this._helpersLoaded;

    return html`
      <div class="editor-root">
        ${this._renderClockSection()}
        ${this._renderDateLanguageSection()}
        ${this._renderEntitiesSection()}
        ${this._renderSizingTypographySection()}
        ${this._renderColorsTransparencySection()}
        ${this._renderInteractionsSection()}
      </div>
    `;
  }

  static styles = css`
    .editor-root {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 4px 0;
    }

    ha-expansion-panel {
      display: block;
    }

    .panel-header {
      font-weight: 500;
      font-size: 14px;
      padding: 4px 0;
    }

    .panel-content {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 12px 4px 8px;
    }

    .nested-panels {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .field-row {
      width: 100%;
    }

    ha-selector {
      width: 100%;
      display: block;
    }

    .two-col {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
      align-items: center;
    }

    .three-col {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 8px;
      align-items: center;
    }

    .color-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .color-selector {
      flex: 1 1 auto;
      min-width: 0;
    }

    .reset-btn {
      flex: 0 0 auto;
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.15));
      color: var(--primary-text-color, inherit);
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.3));
      border-radius: 6px;
      width: 34px;
      height: 34px;
      cursor: pointer;
      font-size: 16px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .reset-btn:hover {
      background: var(--primary-color, #03a9f4);
      color: var(--text-primary-color, #fff);
    }

    .fallback-panel {
      border: 1px solid var(--divider-color, #ccc);
      border-radius: 8px;
      padding: 8px 12px;
    }

    .fallback-field {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 13px;
    }

    .fallback-switch {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 13px;
      gap: 8px;
    }

    .helper {
      color: var(--secondary-text-color, #666);
      font-size: 11px;
    }

    @media (max-width: 500px) {
      .two-col,
      .three-col {
        grid-template-columns: 1fr;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'simple-clock-card-editor': SimpleClockCardEditor;
  }
}
