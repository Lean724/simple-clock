export type SupportedLanguage =
  | 'auto'
  | 'en'
  | 'es'
  | 'it'
  | 'pt'
  | 'pt-BR'
  | 'ru'
  | 'de'
  | 'fr'
  | 'zh-Hans';

export type ResolvedLanguage = Exclude<SupportedLanguage, 'auto'>;

export type TimeMode = 'h' | 'hm' | 'hms';
export type SecondsStyle = 'inline' | 'superscript' | 'subscript';
export type AmPmPosition = 'right' | 'superscript' | 'subscript' | 'below';

export type DateFormatType = 'short' | 'long' | 'both';
export type ShortDateOrder = 'DMY' | 'MDY' | 'YMD';
export type DateSeparator = '/' | '-' | '.';
export type WeekdayFormat = 'long' | 'short' | 'none';
export type MonthFormat = 'long' | 'short';
export type VerticalPosition = 'top' | 'bottom';

export type HorizontalAlign = 'left' | 'center' | 'right';
export type FontWeightOption = '200' | '300' | '400' | '500' | '600' | '700' | '800';
export type FontFamilyOption =
  | 'inherit'
  | 'sans-serif'
  | 'serif'
  | 'monospace'
  | 'digital'
  | 'rounded';

export type ColorValue = string | number[];

export type ActionType =
  | 'more-info'
  | 'toggle'
  | 'perform-action'
  | 'call-service'
  | 'navigate'
  | 'url'
  | 'assist'
  | 'none';

export interface ActionConfig {
  action: ActionType | string;
  navigation_path?: string;
  navigation_replace?: boolean;
  url_path?: string;
  perform_action?: string;
  service?: string;
  target?: Record<string, unknown>;
  data?: Record<string, unknown>;
  service_data?: Record<string, unknown>;
  confirmation?: boolean | { text?: string; exemptions?: Array<{ user: string }> };
  pipeline_id?: string;
  start_listening?: boolean;
}

export type ActionTrigger = 'tap' | 'double_tap' | 'hold';

export interface ActionTargetConfig {
  entity?: string;
  tap_action?: ActionConfig;
  double_tap_action?: ActionConfig;
  hold_action?: ActionConfig;
}

export interface EntitySlotConfig {
  entity?: string;
  attribute?: string;
  name?: string;
  icon?: string;
  icon_color?: ColorValue;
  unit?: string;
  show_icon?: boolean;
  show_name?: boolean;
  show_unit?: boolean;
  tap_action?: ActionConfig;
  double_tap_action?: ActionConfig;
  hold_action?: ActionConfig;
}

export interface SimpleClockCardConfig {
  type: string;

  // 1. Clock
  time_mode?: TimeMode;
  use_24h?: boolean;
  show_ampm?: boolean;
  ampm_position?: AmPmPosition;
  leading_zero?: boolean;
  blink_separator?: boolean;
  seconds_style?: SecondsStyle;
  timezone?: string;

  // 2. Date & Language
  language?: SupportedLanguage;
  show_date?: boolean;
  date_position?: VerticalPosition;
  date_format_type?: DateFormatType;
  short_date_order?: ShortDateOrder;
  short_date_separator?: DateSeparator;
  short_year_2_digits?: boolean;
  long_weekday_format?: WeekdayFormat;
  long_month_format?: MonthFormat;
  long_show_year?: boolean;
  capitalize_date?: boolean;

  // 3. Entities (3 fixed slots)
  show_entities?: boolean;
  entities_position?: VerticalPosition;
  entity_1?: EntitySlotConfig;
  entity_2?: EntitySlotConfig;
  entity_3?: EntitySlotConfig;

  // 4. Sizing & Typography
  card_padding?: number;
  card_min_height?: number;
  clock_font_size?: number;
  seconds_font_size?: number;
  date_font_size?: number;
  entity_font_size?: number;
  content_gap?: number;
  text_align?: HorizontalAlign;
  font_weight?: FontWeightOption;
  font_family?: FontFamilyOption;

  // 5. Colors & Transparency
  clock_color?: ColorValue;
  date_color?: ColorValue;
  entity_color?: ColorValue;
  entity_icon_color?: ColorValue;
  background_color?: ColorValue;
  background_opacity?: number;
  backdrop_blur?: number;
  hide_border?: boolean;
  hide_shadow?: boolean;
  border_radius?: number;

  // 6. Interactions
  tap_action?: ActionConfig;
  double_tap_action?: ActionConfig;
  hold_action?: ActionConfig;
}

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed?: string;
  last_updated?: string;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  language?: string;
  locale?: {
    language?: string;
    number_format?: string;
    time_format?: string;
  };
  config?: {
    time_zone?: string;
    unit_system?: {
      temperature?: string;
      length?: string;
      pressure?: string;
      wind_speed?: string;
    };
  };
  themes?: {
    darkMode?: boolean;
  };
  localize?: (key: string, ...args: unknown[]) => string;
  formatEntityState?: (stateObj: HassEntity, state?: string) => string;
  formatEntityAttributeValue?: (
    stateObj: HassEntity,
    attribute: string,
    value?: unknown
  ) => string;
}

export interface LovelaceGridOptions {
  columns?: number | 'full';
  rows?: number | 'auto';
  min_columns?: number;
  max_columns?: number;
  min_rows?: number;
  max_rows?: number;
}

export interface LovelaceCard extends HTMLElement {
  hass?: HomeAssistant;
  setConfig(config: SimpleClockCardConfig): void;
  getCardSize?(): number | Promise<number>;
  getGridOptions?(): LovelaceGridOptions;
}

export interface LovelaceCardEditor extends HTMLElement {
  hass?: HomeAssistant;
  setConfig(config: SimpleClockCardConfig): void;
}

export const DEFAULT_ENTITY_SLOT: Required<
  Pick<EntitySlotConfig, 'show_icon' | 'show_name' | 'show_unit'>
> = {
  show_icon: true,
  show_name: false,
  show_unit: true,
};

export const DEFAULT_CONFIG: Required<
  Omit<
    SimpleClockCardConfig,
    | 'timezone'
    | 'entity_1'
    | 'entity_2'
    | 'entity_3'
    | 'clock_color'
    | 'date_color'
    | 'entity_color'
    | 'entity_icon_color'
    | 'background_color'
    | 'border_radius'
    | 'tap_action'
    | 'double_tap_action'
    | 'hold_action'
  >
> &
  Pick<
    SimpleClockCardConfig,
    | 'timezone'
    | 'entity_1'
    | 'entity_2'
    | 'entity_3'
    | 'clock_color'
    | 'date_color'
    | 'entity_color'
    | 'entity_icon_color'
    | 'background_color'
    | 'border_radius'
    | 'tap_action'
    | 'double_tap_action'
    | 'hold_action'
  > = {
  type: 'custom:simple-clock-card',

  // Clock
  time_mode: 'hm',
  use_24h: true,
  show_ampm: true,
  ampm_position: 'right',
  leading_zero: true,
  blink_separator: false,
  seconds_style: 'superscript',
  timezone: undefined,

  // Date & Language
  language: 'auto',
  show_date: true,
  date_position: 'bottom',
  date_format_type: 'long',
  short_date_order: 'DMY',
  short_date_separator: '/',
  short_year_2_digits: false,
  long_weekday_format: 'long',
  long_month_format: 'long',
  long_show_year: true,
  capitalize_date: true,

  // Entities
  show_entities: true,
  entities_position: 'bottom',
  entity_1: undefined,
  entity_2: undefined,
  entity_3: undefined,

  // Sizing & Typography
  card_padding: 16,
  card_min_height: 0,
  clock_font_size: 56,
  seconds_font_size: 24,
  date_font_size: 18,
  entity_font_size: 14,
  content_gap: 8,
  text_align: 'center',
  font_weight: '500',
  font_family: 'inherit',

  // Colors & Transparency
  clock_color: undefined,
  date_color: undefined,
  entity_color: undefined,
  entity_icon_color: undefined,
  background_color: undefined,
  background_opacity: 100,
  backdrop_blur: 0,
  hide_border: false,
  hide_shadow: false,
  border_radius: undefined,

  // Interactions
  tap_action: undefined,
  double_tap_action: undefined,
  hold_action: undefined,
};
