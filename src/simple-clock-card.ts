import { LitElement, html, css, TemplateResult, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import {
  ActionTargetConfig,
  ActionTrigger,
  DEFAULT_CONFIG,
  EntitySlotConfig,
  HomeAssistant,
  LovelaceCard,
  LovelaceCardEditor,
  LovelaceGridOptions,
  SimpleClockCardConfig,
} from './types';
import { resolveLanguage } from './localize/localize';
import {
  ActionGestureController,
  hasAction,
  hasAnyAction,
  resolveCardActionConfig,
  resolveEntityActionConfig,
  resolveEntityIconColor,
} from './utils/action-handler';
import {
  ResolvedEntityDisplay,
  colorToCss,
  computeCardBackground,
  formatDateString,
  formatTimeParts,
  getFontFamilyCss,
  resolveEntityDisplay,
} from './utils/date-time';
import './editor';

@customElement('simple-clock-card')
export class SimpleClockCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config: SimpleClockCardConfig = { ...DEFAULT_CONFIG };
  @state() private _now: Date = new Date();

  private _tickTimeout?: number;
  private _gestureController = new ActionGestureController();

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    try {
      const win = window as unknown as {
        loadCardHelpers?: () => Promise<{
          createCardElement: (cfg: Record<string, unknown>) => Promise<{
            constructor?: { getConfigElement?: () => Promise<unknown> };
          }>;
        }>;
      };
      const helpers = await win.loadCardHelpers?.();
      if (helpers && !customElements.get('ha-selector')) {
        const card = await helpers.createCardElement({ type: 'entities', entities: [] });
        await card?.constructor?.getConfigElement?.();
      }
    } catch {
      // Safe fallback outside Home Assistant
    }
    return document.createElement('simple-clock-card-editor') as LovelaceCardEditor;
  }

  public static getStubConfig(): SimpleClockCardConfig {
    return {
      type: 'custom:simple-clock-card',
      time_mode: 'hm',
      use_24h: true,
      show_date: true,
      date_format_type: 'long',
      language: 'auto',
    };
  }

  public setConfig(config: SimpleClockCardConfig): void {
    if (!config) {
      throw new Error('Invalid configuration');
    }
    this._config = {
      ...DEFAULT_CONFIG,
      ...config,
    };
  }

  public getCardSize(): number {
    const showDate = this._config.show_date ?? DEFAULT_CONFIG.show_date;
    const hasEntities =
      (this._config.show_entities ?? DEFAULT_CONFIG.show_entities) &&
      Boolean(
        this._config.entity_1?.entity ||
          this._config.entity_2?.entity ||
          this._config.entity_3?.entity
      );
    if (showDate && hasEntities) return 3;
    return 2;
  }

  public getGridOptions(): LovelaceGridOptions {
    return {
      columns: 6,
      min_columns: 2,
      rows: 2,
      min_rows: 1,
    };
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this._scheduleTick();
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._tickTimeout !== undefined) {
      window.clearTimeout(this._tickTimeout);
      this._tickTimeout = undefined;
    }
    this._gestureController.destroy();
  }

  private _scheduleTick(): void {
    if (this._tickTimeout !== undefined) {
      window.clearTimeout(this._tickTimeout);
    }
    const now = new Date();
    this._now = now;
    const msToNextSecond = 1000 - now.getMilliseconds();
    this._tickTimeout = window.setTimeout(() => {
      this._scheduleTick();
    }, msToNextSecond);
  }

  private _dispatchAction(
    actionConfig: ActionTargetConfig,
    action: ActionTrigger
  ): void {
    const triggerConfig =
      action === 'tap'
        ? actionConfig.tap_action
        : action === 'double_tap'
          ? actionConfig.double_tap_action
          : actionConfig.hold_action;
    if (!hasAction(triggerConfig)) return;

    this.dispatchEvent(
      new CustomEvent('hass-action', {
        detail: { config: actionConfig, action },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _isEventFromInteractiveEntity(ev: Event): boolean {
    const path = ev.composedPath?.() ?? [];
    for (const node of path) {
      if (
        node instanceof Element &&
        node.classList?.contains('entity-chip') &&
        node.classList?.contains('interactive')
      ) {
        return true;
      }
    }
    const target = ev.target as Element | null;
    return Boolean(target?.closest?.('.entity-chip.interactive'));
  }

  private _renderClock(): TemplateResult {
    const timeParts = formatTimeParts(
      this._now,
      this._config,
      this.hass?.config?.time_zone
    );
    const secondsStyle = this._config.seconds_style ?? DEFAULT_CONFIG.seconds_style;
    const ampmPos = this._config.ampm_position ?? DEFAULT_CONFIG.ampm_position;
    const blinkSeparator = this._config.blink_separator ?? DEFAULT_CONFIG.blink_separator;
    const isBlinkDim = blinkSeparator && this._now.getSeconds() % 2 === 1;

    const clockSize = this._config.clock_font_size ?? DEFAULT_CONFIG.clock_font_size;
    const secondsSize = this._config.seconds_font_size ?? DEFAULT_CONFIG.seconds_font_size;
    const clockColor = colorToCss(this._config.clock_color);
    const fontWeight = this._config.font_weight ?? DEFAULT_CONFIG.font_weight;

    const clockStyle = styleMap({
      fontSize: `${clockSize}px`,
      fontWeight,
      color: clockColor ?? null,
    });

    const smallStyle = styleMap({
      fontSize: `${secondsSize}px`,
      fontWeight,
    });

    return html`
      <div class="clock-wrapper" style=${clockStyle}>
        <div class="clock-main">
          <span class="clock-hours">${timeParts.hours}</span>
          ${timeParts.showMinutes
            ? html`<span class="clock-separator ${isBlinkDim ? 'blink-dim' : ''}">:</span><span class="clock-minutes">${timeParts.minutes}</span>`
            : nothing}
          ${timeParts.showSeconds
            ? secondsStyle === 'inline'
              ? html`<span class="clock-separator ${isBlinkDim ? 'blink-dim' : ''}">:</span><span class="clock-seconds-inline">${timeParts.seconds}</span>`
              : html`<span
                  class="clock-seconds-small clock-seconds-${secondsStyle}"
                  style=${smallStyle}
                  >${timeParts.seconds}</span
                >`
            : nothing}
          ${timeParts.showAmPm && ampmPos !== 'below'
            ? html`<span class="clock-ampm clock-ampm-${ampmPos}" style=${smallStyle}
                >${timeParts.ampm}</span
              >`
            : nothing}
        </div>
        ${timeParts.showAmPm && ampmPos === 'below'
          ? html`<div class="clock-ampm-below" style=${smallStyle}>${timeParts.ampm}</div>`
          : nothing}
      </div>
    `;
  }

  private _renderDate(): TemplateResult | typeof nothing {
    const showDate = this._config.show_date ?? DEFAULT_CONFIG.show_date;
    if (!showDate) return nothing;

    const hassLang = this.hass?.locale?.language || this.hass?.language;
    const lang = resolveLanguage(this._config.language, hassLang);
    const dateStr = formatDateString(
      this._now,
      this._config,
      lang,
      this.hass?.config?.time_zone
    );

    const dateStyle = styleMap({
      fontSize: `${this._config.date_font_size ?? DEFAULT_CONFIG.date_font_size}px`,
      color: colorToCss(this._config.date_color) ?? null,
    });

    return html`<div class="date-row" style=${dateStyle}>${dateStr}</div>`;
  }

  private _renderEntityIcon(
    slot: EntitySlotConfig | undefined,
    item: ResolvedEntityDisplay
  ): TemplateResult | typeof nothing {
    if (!item.icon) return nothing;

    const iconColor = resolveEntityIconColor(
      slot?.icon_color,
      this._config.entity_icon_color
    );
    const iconSize = Math.max(
      14,
      Math.round((this._config.entity_font_size ?? DEFAULT_CONFIG.entity_font_size) * 1.25)
    );
    const iconStyle = styleMap({
      color: iconColor ?? null,
      '--state-icon-color': iconColor ?? null,
      '--paper-item-icon-color': iconColor ?? null,
      '--mdc-icon-size': `${iconSize}px`,
    });

    if (
      !slot?.icon &&
      !slot?.attribute &&
      item.stateObj &&
      customElements.get('ha-state-icon')
    ) {
      return html`
        <ha-state-icon
          class="entity-icon"
          style=${iconStyle}
          .hass=${this.hass}
          .stateObj=${item.stateObj}
        ></ha-state-icon>
      `;
    }

    return html`
      <ha-icon
        class="entity-icon"
        style=${iconStyle}
        .icon=${item.icon}
      ></ha-icon>
    `;
  }

  private _renderEntities(): TemplateResult | typeof nothing {
    const showEntities = this._config.show_entities ?? DEFAULT_CONFIG.show_entities;
    if (!showEntities) return nothing;

    const hassLang = this.hass?.locale?.language || this.hass?.language;
    const lang = resolveLanguage(this._config.language, hassLang);

    const slotEntries: Array<{ key: string; slot: EntitySlotConfig | undefined }> = [
      { key: 'entity_1', slot: this._config.entity_1 },
      { key: 'entity_2', slot: this._config.entity_2 },
      { key: 'entity_3', slot: this._config.entity_3 },
    ];

    const resolved = slotEntries
      .map(({ key, slot }) => ({
        key,
        slot,
        display: resolveEntityDisplay(this.hass, slot, lang),
      }))
      .filter(
        (
          entry
        ): entry is {
          key: string;
          slot: EntitySlotConfig | undefined;
          display: ResolvedEntityDisplay;
        } => entry.display !== null
      );

    if (resolved.length === 0) return nothing;

    const textAlign = this._config.text_align ?? DEFAULT_CONFIG.text_align;
    const justify =
      textAlign === 'left' ? 'flex-start' : textAlign === 'right' ? 'flex-end' : 'center';
    const entityFontSize = this._config.entity_font_size ?? DEFAULT_CONFIG.entity_font_size;
    const entityColor = colorToCss(this._config.entity_color);

    const rowStyle = styleMap({
      justifyContent: justify,
      fontSize: `${entityFontSize}px`,
      color: entityColor ?? null,
    });

    return html`
      <div class="entities-row" style=${rowStyle}>
        ${resolved.map(({ key, slot, display }) => {
          const valueText = display.unit
            ? `${display.value} ${display.unit}`
            : display.value;
          const entityActionConfig = resolveEntityActionConfig(slot, display.entityId);
          const interactive = hasAnyAction(entityActionConfig);

          return html`
            <div
              class="entity-chip ${interactive ? 'interactive' : ''} ${display.available ? '' : 'entity-unavailable'}"
              role=${interactive ? 'button' : nothing}
              tabindex=${interactive ? '0' : nothing}
              @pointerdown=${(e: PointerEvent) => {
                if (!interactive) return;
                e.stopPropagation();
                this._gestureController.handlePointerDown(
                  e,
                  key,
                  entityActionConfig,
                  (action) => this._dispatchAction(entityActionConfig, action)
                );
              }}
              @pointermove=${(e: PointerEvent) => {
                if (!interactive) return;
                e.stopPropagation();
                this._gestureController.handlePointerMove(e, key);
              }}
              @pointerup=${(e: PointerEvent) => {
                if (!interactive) return;
                e.stopPropagation();
                this._gestureController.handlePointerUp(
                  e,
                  key,
                  entityActionConfig,
                  (action) => this._dispatchAction(entityActionConfig, action)
                );
              }}
              @pointercancel=${(e: PointerEvent) => {
                if (!interactive) return;
                e.stopPropagation();
                this._gestureController.handlePointerCancel(key);
              }}
              @contextmenu=${(e: Event) => {
                if (!interactive) return;
                e.stopPropagation();
                this._gestureController.handleContextMenu(e, key, entityActionConfig);
              }}
              @keydown=${(e: KeyboardEvent) => {
                if (!interactive) return;
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  e.stopPropagation();
                  this._dispatchAction(entityActionConfig, 'tap');
                }
              }}
            >
              ${this._renderEntityIcon(slot, display)}
              ${display.name
                ? html`<span class="entity-name">${display.name}:</span>`
                : nothing}
              <span class="entity-value">${valueText}</span>
            </div>
          `;
        })}
      </div>
    `;
  }

  protected render(): TemplateResult {
    const padding = this._config.card_padding ?? DEFAULT_CONFIG.card_padding;
    const minHeight = this._config.card_min_height ?? DEFAULT_CONFIG.card_min_height;
    const gap = this._config.content_gap ?? DEFAULT_CONFIG.content_gap;
    const textAlign = this._config.text_align ?? DEFAULT_CONFIG.text_align;
    const alignItems =
      textAlign === 'left' ? 'flex-start' : textAlign === 'right' ? 'flex-end' : 'center';

    const bg = computeCardBackground(
      this._config.background_color,
      this._config.background_opacity ?? DEFAULT_CONFIG.background_opacity
    );
    const blur = this._config.backdrop_blur ?? DEFAULT_CONFIG.backdrop_blur;
    const hideBorder = this._config.hide_border ?? DEFAULT_CONFIG.hide_border;
    const hideShadow = this._config.hide_shadow ?? DEFAULT_CONFIG.hide_shadow;
    const borderRadius = this._config.border_radius;
    const fontFamily = getFontFamilyCss(this._config.font_family);

    const cardStyles: Record<string, string | null | undefined> = {
      padding: `${padding}px`,
      minHeight: minHeight > 0 ? `${minHeight}px` : null,
      gap: `${gap}px`,
      textAlign,
      alignItems,
      fontFamily: fontFamily ?? null,
      background: bg ?? null,
      backdropFilter: blur > 0 ? `blur(${blur}px)` : null,
      WebkitBackdropFilter: blur > 0 ? `blur(${blur}px)` : null,
      borderRadius: borderRadius !== undefined ? `${borderRadius}px` : null,
      '--ha-card-border-radius':
        borderRadius !== undefined ? `${borderRadius}px` : null,
      borderWidth: hideBorder ? '0px' : null,
      borderColor: hideBorder ? 'transparent' : null,
      '--ha-card-border-width': hideBorder ? '0px' : null,
      boxShadow: hideShadow ? 'none' : null,
      '--ha-card-box-shadow': hideShadow ? 'none' : null,
    };

    const datePos = this._config.date_position ?? DEFAULT_CONFIG.date_position;
    const entitiesPos = this._config.entities_position ?? DEFAULT_CONFIG.entities_position;
    const cardActionConfig = resolveCardActionConfig(this._config);
    const cardInteractive = hasAnyAction(cardActionConfig);

    return html`
      <ha-card
        class=${cardInteractive ? 'interactive' : ''}
        style=${styleMap(cardStyles)}
        role=${cardInteractive ? 'button' : nothing}
        tabindex=${cardInteractive ? '0' : nothing}
        @pointerdown=${(e: PointerEvent) => {
          if (!cardInteractive || this._isEventFromInteractiveEntity(e)) return;
          this._gestureController.handlePointerDown(e, 'card', cardActionConfig, (action) =>
            this._dispatchAction(cardActionConfig, action)
          );
        }}
        @pointermove=${(e: PointerEvent) => {
          if (!cardInteractive) return;
          this._gestureController.handlePointerMove(e, 'card');
        }}
        @pointerup=${(e: PointerEvent) => {
          if (!cardInteractive || this._isEventFromInteractiveEntity(e)) return;
          this._gestureController.handlePointerUp(e, 'card', cardActionConfig, (action) =>
            this._dispatchAction(cardActionConfig, action)
          );
        }}
        @pointercancel=${() => {
          if (!cardInteractive) return;
          this._gestureController.handlePointerCancel('card');
        }}
        @contextmenu=${(e: Event) => {
          if (!cardInteractive || this._isEventFromInteractiveEntity(e)) return;
          this._gestureController.handleContextMenu(e, 'card', cardActionConfig);
        }}
        @keydown=${(e: KeyboardEvent) => {
          if (!cardInteractive || this._isEventFromInteractiveEntity(e)) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this._dispatchAction(cardActionConfig, 'tap');
          }
        }}
      >
        ${entitiesPos === 'top' ? this._renderEntities() : nothing}
        ${datePos === 'top' ? this._renderDate() : nothing}
        ${this._renderClock()}
        ${datePos === 'bottom' ? this._renderDate() : nothing}
        ${entitiesPos === 'bottom' ? this._renderEntities() : nothing}
      </ha-card>
    `;
  }

  static styles = css`
    :host {
      display: block;
      height: 100%;
    }

    ha-card {
      height: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      overflow: hidden;
      transition: background 0.2s ease, box-shadow 0.2s ease;
    }

    ha-card.interactive {
      cursor: pointer;
      user-select: none;
    }

    ha-card.interactive:focus-visible {
      outline: 2px solid var(--primary-color, #03a9f4);
      outline-offset: -2px;
    }

    .clock-wrapper {
      display: flex;
      flex-direction: column;
      line-height: 1.05;
      color: var(--primary-text-color);
      font-variant-numeric: tabular-nums;
      user-select: none;
    }

    .clock-main {
      display: inline-flex;
      align-items: baseline;
      justify-content: inherit;
      flex-wrap: nowrap;
    }

    .clock-separator {
      transition: opacity 0.2s ease;
    }

    .clock-separator.blink-dim {
      opacity: 0.22;
    }

    .clock-seconds-small {
      margin-left: 0.14em;
      line-height: 1;
      opacity: 0.88;
    }

    .clock-seconds-superscript {
      align-self: flex-start;
      margin-top: 0.12em;
    }

    .clock-seconds-subscript {
      align-self: flex-end;
      margin-bottom: 0.12em;
    }

    .clock-ampm {
      margin-left: 0.22em;
      letter-spacing: 0.04em;
      opacity: 0.88;
      line-height: 1;
    }

    .clock-ampm-superscript {
      align-self: flex-start;
      margin-top: 0.14em;
    }

    .clock-ampm-subscript {
      align-self: flex-end;
      margin-bottom: 0.14em;
    }

    .clock-ampm-below {
      margin-top: 4px;
      letter-spacing: 0.08em;
      opacity: 0.85;
    }

    .date-row {
      color: var(--secondary-text-color);
      line-height: 1.3;
      user-select: none;
    }

    .entities-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px 14px;
      width: 100%;
      color: var(--primary-text-color);
    }

    .entity-chip {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 2px 6px;
      border-radius: 999px;
      transition: background-color 0.15s ease;
      line-height: 1.3;
      user-select: none;
    }

    .entity-chip.interactive {
      cursor: pointer;
    }

    .entity-chip.interactive:hover,
    .entity-chip.interactive:focus-visible {
      background-color: var(--secondary-background-color, rgba(127, 127, 127, 0.14));
      outline: none;
    }

    .entity-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: var(--state-icon-color, var(--paper-item-icon-color, inherit));
      flex-shrink: 0;
    }

    .entity-name {
      opacity: 0.78;
    }

    .entity-value {
      font-weight: 500;
    }

    .entity-unavailable .entity-value {
      opacity: 0.6;
      font-style: italic;
    }
  `;
}

const win = window as unknown as {
  customCards?: Array<Record<string, unknown>>;
};
win.customCards = win.customCards || [];
if (!win.customCards.some((card) => card.type === 'simple-clock-card')) {
  win.customCards.push({
    type: 'simple-clock-card',
    name: 'Simple Clock Card',
    description:
      'Highly customizable clock, date, and status entities card with full visual editor and multi-language support.',
    preview: true,
  });
}

declare global {
  interface HTMLElementTagNameMap {
    'simple-clock-card': SimpleClockCard;
  }
}
