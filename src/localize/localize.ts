import { ResolvedLanguage, SupportedLanguage } from '../types';

export interface DateLocaleStrings {
  weekdaysLong: readonly [string, string, string, string, string, string, string];
  weekdaysShort: readonly [string, string, string, string, string, string, string];
  monthsLong: readonly [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string
  ];
  monthsShort: readonly [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string
  ];
}

export const DATE_LOCALE_DATA: Record<ResolvedLanguage, DateLocaleStrings> = {
  en: {
    weekdaysLong: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    monthsLong: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    monthsShort: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
  },
  es: {
    weekdaysLong: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    weekdaysShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    monthsLong: [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre',
    ],
    monthsShort: [
      'ene',
      'feb',
      'mar',
      'abr',
      'may',
      'jun',
      'jul',
      'ago',
      'sep',
      'oct',
      'nov',
      'dic',
    ],
  },
  it: {
    weekdaysLong: ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'],
    weekdaysShort: ['dom', 'lun', 'mar', 'mer', 'gio', 'ven', 'sab'],
    monthsLong: [
      'gennaio',
      'febbraio',
      'marzo',
      'aprile',
      'maggio',
      'giugno',
      'luglio',
      'agosto',
      'settembre',
      'ottobre',
      'novembre',
      'dicembre',
    ],
    monthsShort: [
      'gen',
      'feb',
      'mar',
      'apr',
      'mag',
      'giu',
      'lug',
      'ago',
      'set',
      'ott',
      'nov',
      'dic',
    ],
  },
  pt: {
    weekdaysLong: [
      'domingo',
      'segunda-feira',
      'terça-feira',
      'quarta-feira',
      'quinta-feira',
      'sexta-feira',
      'sábado',
    ],
    weekdaysShort: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'],
    monthsLong: [
      'janeiro',
      'fevereiro',
      'março',
      'abril',
      'maio',
      'junho',
      'julho',
      'agosto',
      'setembro',
      'outubro',
      'novembro',
      'dezembro',
    ],
    monthsShort: [
      'jan',
      'fev',
      'mar',
      'abr',
      'mai',
      'jun',
      'jul',
      'ago',
      'set',
      'out',
      'nov',
      'dez',
    ],
  },
  'pt-BR': {
    weekdaysLong: [
      'domingo',
      'segunda-feira',
      'terça-feira',
      'quarta-feira',
      'quinta-feira',
      'sexta-feira',
      'sábado',
    ],
    weekdaysShort: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'],
    monthsLong: [
      'janeiro',
      'fevereiro',
      'março',
      'abril',
      'maio',
      'junho',
      'julho',
      'agosto',
      'setembro',
      'outubro',
      'novembro',
      'dezembro',
    ],
    monthsShort: [
      'jan',
      'fev',
      'mar',
      'abr',
      'mai',
      'jun',
      'jul',
      'ago',
      'set',
      'out',
      'nov',
      'dez',
    ],
  },
  ru: {
    weekdaysLong: [
      'воскресенье',
      'понедельник',
      'вторник',
      'среда',
      'четверг',
      'пятница',
      'суббота',
    ],
    weekdaysShort: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
    monthsLong: [
      'января',
      'февраля',
      'марта',
      'апреля',
      'мая',
      'июня',
      'июля',
      'августа',
      'сентября',
      'октября',
      'ноября',
      'декабря',
    ],
    monthsShort: [
      'янв',
      'фев',
      'мар',
      'апр',
      'май',
      'июн',
      'июл',
      'авг',
      'сен',
      'окт',
      'ноя',
      'дек',
    ],
  },
  de: {
    weekdaysLong: [
      'Sonntag',
      'Montag',
      'Dienstag',
      'Mittwoch',
      'Donnerstag',
      'Freitag',
      'Samstag',
    ],
    weekdaysShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
    monthsLong: [
      'Januar',
      'Februar',
      'März',
      'April',
      'Mai',
      'Juni',
      'Juli',
      'August',
      'September',
      'Oktober',
      'November',
      'Dezember',
    ],
    monthsShort: [
      'Jan',
      'Feb',
      'Mär',
      'Apr',
      'Mai',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Okt',
      'Nov',
      'Dez',
    ],
  },
  fr: {
    weekdaysLong: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
    weekdaysShort: ['dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam'],
    monthsLong: [
      'janvier',
      'février',
      'mars',
      'avril',
      'mai',
      'juin',
      'juillet',
      'août',
      'septembre',
      'octobre',
      'novembre',
      'décembre',
    ],
    monthsShort: [
      'janv.',
      'févr.',
      'mars',
      'avr.',
      'mai',
      'juin',
      'juil.',
      'août',
      'sept.',
      'oct.',
      'nov.',
      'déc.',
    ],
  },
  'zh-Hans': {
    weekdaysLong: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    weekdaysShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    monthsLong: [
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月',
    ],
    monthsShort: [
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月',
    ],
  },
};

export interface TranslationStrings {
  card_name: string;
  card_description: string;
  unavailable: string;

  // Sections
  section_clock: string;
  section_date_language: string;
  section_entities: string;
  section_sizing_typography: string;
  section_colors_transparency: string;

  // Clock fields
  time_mode: string;
  time_mode_h: string;
  time_mode_hm: string;
  time_mode_hms: string;
  use_24h: string;
  show_ampm: string;
  ampm_position: string;
  ampm_right: string;
  ampm_superscript: string;
  ampm_subscript: string;
  ampm_below: string;
  leading_zero: string;
  blink_separator: string;
  seconds_style: string;
  seconds_inline: string;
  seconds_superscript: string;
  seconds_subscript: string;
  timezone: string;
  timezone_helper: string;

  // Date & Language fields
  language: string;
  language_auto: string;
  show_date: string;
  date_position: string;
  position_top: string;
  position_bottom: string;
  date_format_type: string;
  date_format_short: string;
  date_format_long: string;
  date_format_both: string;
  short_date_order: string;
  order_dmy: string;
  order_mdy: string;
  order_ymd: string;
  short_date_separator: string;
  short_year_2_digits: string;
  long_weekday_format: string;
  weekday_long: string;
  weekday_short: string;
  weekday_none: string;
  long_month_format: string;
  month_long: string;
  month_short: string;
  long_show_year: string;
  capitalize_date: string;

  // Entities fields
  show_entities: string;
  entities_position: string;
  entity_slot: string;
  entity: string;
  attribute: string;
  attribute_helper: string;
  custom_name: string;
  custom_icon: string;
  custom_unit: string;
  show_icon: string;
  show_name: string;
  show_unit: string;

  // Sizing & Typography
  card_padding: string;
  card_min_height: string;
  card_min_height_helper: string;
  clock_font_size: string;
  seconds_font_size: string;
  date_font_size: string;
  entity_font_size: string;
  content_gap: string;
  text_align: string;
  align_left: string;
  align_center: string;
  align_right: string;
  font_weight: string;
  font_family: string;
  font_inherit: string;
  font_sans: string;
  font_serif: string;
  font_mono: string;
  font_digital: string;
  font_rounded: string;

  // Colors & Transparency
  clock_color: string;
  date_color: string;
  entity_color: string;
  entity_icon_color: string;
  background_color: string;
  background_opacity: string;
  backdrop_blur: string;
  border_radius: string;
  hide_border: string;
  hide_shadow: string;
  reset_default: string;
}

const en: TranslationStrings = {
  card_name: 'Simple Clock Card',
  card_description:
    'Highly customizable clock, date, and status entities card with full visual editor.',
  unavailable: 'Unavailable',

  section_clock: 'Clock',
  section_date_language: 'Date & Language',
  section_entities: 'Status Entities (3)',
  section_sizing_typography: 'Size & Typography',
  section_colors_transparency: 'Colors & Transparency',

  time_mode: 'Time display',
  time_mode_h: 'Hours only (HH)',
  time_mode_hm: 'Hours & minutes (HH:MM)',
  time_mode_hms: 'Hours, minutes & seconds (HH:MM:SS)',
  use_24h: '24-hour format',
  show_ampm: 'Show AM/PM',
  ampm_position: 'AM/PM position',
  ampm_right: 'Right (inline)',
  ampm_superscript: 'Superscript',
  ampm_subscript: 'Subscript',
  ampm_below: 'Below clock',
  leading_zero: 'Leading zero on hours',
  blink_separator: 'Blink ":" separator',
  seconds_style: 'Seconds style',
  seconds_inline: 'Same size (inline)',
  seconds_superscript: 'Small (superscript)',
  seconds_subscript: 'Small (subscript)',
  timezone: 'Timezone (optional)',
  timezone_helper: 'Leave empty for system timezone (e.g. America/New_York)',

  language: 'Language',
  language_auto: 'Automatic (Home Assistant)',
  show_date: 'Show date',
  date_position: 'Date position',
  position_top: 'Top (above clock)',
  position_bottom: 'Bottom (below clock)',
  date_format_type: 'Date style',
  date_format_short: 'Short date',
  date_format_long: 'Long date',
  date_format_both: 'Weekday + Short date',
  short_date_order: 'Short date order',
  order_dmy: 'DD/MM/YYYY',
  order_mdy: 'MM/DD/YYYY',
  order_ymd: 'YYYY/MM/DD',
  short_date_separator: 'Date separator',
  short_year_2_digits: '2-digit year',
  long_weekday_format: 'Weekday',
  weekday_long: 'Full (Monday)',
  weekday_short: 'Short (Mon)',
  weekday_none: 'Hidden',
  long_month_format: 'Month name',
  month_long: 'Full',
  month_short: 'Abbreviated',
  long_show_year: 'Show year',
  capitalize_date: 'Capitalize first letter',

  show_entities: 'Show entities',
  entities_position: 'Entities position',
  entity_slot: 'Entity',
  entity: 'Entity',
  attribute: 'Attribute (optional)',
  attribute_helper: 'Leave empty to display the main state',
  custom_name: 'Custom name (optional)',
  custom_icon: 'Custom icon (optional)',
  custom_unit: 'Custom unit (optional)',
  show_icon: 'Show icon',
  show_name: 'Show name',
  show_unit: 'Show unit',

  card_padding: 'Card padding',
  card_min_height: 'Minimum card height',
  card_min_height_helper: '0 = automatic height',
  clock_font_size: 'Clock text size',
  seconds_font_size: 'Seconds / AM-PM size',
  date_font_size: 'Date text size',
  entity_font_size: 'Entities text size',
  content_gap: 'Spacing between elements',
  text_align: 'Alignment',
  align_left: 'Left',
  align_center: 'Center',
  align_right: 'Right',
  font_weight: 'Font weight',
  font_family: 'Font style',
  font_inherit: 'Theme default',
  font_sans: 'Sans-serif',
  font_serif: 'Serif',
  font_mono: 'Monospace',
  font_digital: 'Digital / Tabular',
  font_rounded: 'Rounded',

  clock_color: 'Clock text color',
  date_color: 'Date text color',
  entity_color: 'Entities text color',
  entity_icon_color: 'Entities icon color',
  background_color: 'Card background color',
  background_opacity: 'Background opacity',
  backdrop_blur: 'Background blur (glass)',
  border_radius: 'Corner radius',
  hide_border: 'Hide card border',
  hide_shadow: 'Hide card shadow',
  reset_default: 'Reset to default',
};

const es: TranslationStrings = {
  card_name: 'Simple Clock Card',
  card_description:
    'Tarjeta de reloj, fecha y entidades de estado altamente configurable desde la interfaz visual.',
  unavailable: 'No disponible',

  section_clock: 'Reloj',
  section_date_language: 'Fecha e Idioma',
  section_entities: 'Entidades de Estado (3)',
  section_sizing_typography: 'Tamaño y Tipografía',
  section_colors_transparency: 'Colores y Transparencia',

  time_mode: 'Visualización de la hora',
  time_mode_h: 'Solo horas (HH)',
  time_mode_hm: 'Horas y minutos (HH:MM)',
  time_mode_hms: 'Horas, minutos y segundos (HH:MM:SS)',
  use_24h: 'Formato 24 horas',
  show_ampm: 'Mostrar AM/PM',
  ampm_position: 'Posición de AM/PM',
  ampm_right: 'Derecha (en línea)',
  ampm_superscript: 'Superíndice',
  ampm_subscript: 'Subíndice',
  ampm_below: 'Debajo del reloj',
  leading_zero: 'Cero inicial en horas',
  blink_separator: 'Parpadeo del separador ":"',
  seconds_style: 'Estilo de los segundos',
  seconds_inline: 'Mismo tamaño (en línea)',
  seconds_superscript: 'Pequeños (superíndice)',
  seconds_subscript: 'Pequeños (subíndice)',
  timezone: 'Zona horaria (opcional)',
  timezone_helper: 'Dejar vacío para usar la del sistema (ej. America/Argentina/Buenos_Aires)',

  language: 'Idioma',
  language_auto: 'Automático (Home Assistant)',
  show_date: 'Mostrar fecha',
  date_position: 'Posición de la fecha',
  position_top: 'Arriba (sobre el reloj)',
  position_bottom: 'Abajo (debajo del reloj)',
  date_format_type: 'Tipo de fecha',
  date_format_short: 'Fecha corta',
  date_format_long: 'Fecha larga',
  date_format_both: 'Día de la semana + Fecha corta',
  short_date_order: 'Orden de fecha corta',
  order_dmy: 'DD/MM/AAAA',
  order_mdy: 'MM/DD/AAAA',
  order_ymd: 'AAAA/MM/DD',
  short_date_separator: 'Separador de fecha',
  short_year_2_digits: 'Año de 2 dígitos',
  long_weekday_format: 'Día de la semana',
  weekday_long: 'Completo (lunes)',
  weekday_short: 'Corto (lun)',
  weekday_none: 'Oculto',
  long_month_format: 'Nombre del mes',
  month_long: 'Completo',
  month_short: 'Abreviado',
  long_show_year: 'Mostrar año',
  capitalize_date: 'Mayúscula inicial',

  show_entities: 'Mostrar entidades',
  entities_position: 'Posición de las entidades',
  entity_slot: 'Entidad',
  entity: 'Entidad',
  attribute: 'Atributo (opcional)',
  attribute_helper: 'Dejar vacío para mostrar el estado principal',
  custom_name: 'Nombre personalizado (opcional)',
  custom_icon: 'Icono personalizado (opcional)',
  custom_unit: 'Unidad personalizada (opcional)',
  show_icon: 'Mostrar icono',
  show_name: 'Mostrar nombre',
  show_unit: 'Mostrar unidad',

  card_padding: 'Relleno interior de la tarjeta',
  card_min_height: 'Altura mínima de la tarjeta',
  card_min_height_helper: '0 = altura automática',
  clock_font_size: 'Tamaño del texto del reloj',
  seconds_font_size: 'Tamaño de segundos / AM-PM',
  date_font_size: 'Tamaño del texto de fecha',
  entity_font_size: 'Tamaño de las entidades',
  content_gap: 'Espacio entre elementos',
  text_align: 'Alineación',
  align_left: 'Izquierda',
  align_center: 'Centro',
  align_right: 'Derecha',
  font_weight: 'Grosor de fuente',
  font_family: 'Estilo de tipografía',
  font_inherit: 'Por defecto del tema',
  font_sans: 'Sans-serif',
  font_serif: 'Serif',
  font_mono: 'Monoespaciada',
  font_digital: 'Digital / Tabular',
  font_rounded: 'Redondeada',

  clock_color: 'Color del texto del reloj',
  date_color: 'Color del texto de la fecha',
  entity_color: 'Color del texto de entidades',
  entity_icon_color: 'Color del icono de entidades',
  background_color: 'Color de fondo de la tarjeta',
  background_opacity: 'Opacidad del fondo',
  backdrop_blur: 'Desenfoque de fondo (cristal)',
  border_radius: 'Radio de las esquinas',
  hide_border: 'Ocultar borde de la tarjeta',
  hide_shadow: 'Ocultar sombra de la tarjeta',
  reset_default: 'Restablecer',
};

const it: TranslationStrings = {
  card_name: 'Simple Clock Card',
  card_description:
    'Scheda orologio, data ed entità di stato altamente personalizzabile tramite editor visivo.',
  unavailable: 'Non disponibile',

  section_clock: 'Orologio',
  section_date_language: 'Data e Lingua',
  section_entities: 'Entità di Stato (3)',
  section_sizing_typography: 'Dimensioni e Tipografia',
  section_colors_transparency: 'Colori e Trasparenza',

  time_mode: 'Visualizzazione ora',
  time_mode_h: 'Solo ore (HH)',
  time_mode_hm: 'Ore e minuti (HH:MM)',
  time_mode_hms: 'Ore, minuti e secondi (HH:MM:SS)',
  use_24h: 'Formato 24 ore',
  show_ampm: 'Mostra AM/PM',
  ampm_position: 'Posizione AM/PM',
  ampm_right: 'Destra (in linea)',
  ampm_superscript: 'Apice',
  ampm_subscript: 'Pedice',
  ampm_below: 'Sotto l’orologio',
  leading_zero: 'Zero iniziale sulle ore',
  blink_separator: 'Lampeggio separatore ":"',
  seconds_style: 'Stile dei secondi',
  seconds_inline: 'Stessa dimensione (in linea)',
  seconds_superscript: 'Piccoli (apice)',
  seconds_subscript: 'Piccoli (pedice)',
  timezone: 'Fuso orario (opzionale)',
  timezone_helper: 'Lascia vuoto per il fuso orario di sistema (es. Europe/Rome)',

  language: 'Lingua',
  language_auto: 'Automatico (Home Assistant)',
  show_date: 'Mostra data',
  date_position: 'Posizione della data',
  position_top: 'Sopra (sopra l’orologio)',
  position_bottom: 'Sotto (sotto l’orologio)',
  date_format_type: 'Formato data',
  date_format_short: 'Data breve',
  date_format_long: 'Data estesa',
  date_format_both: 'Giorno della settimana + Data breve',
  short_date_order: 'Ordine data breve',
  order_dmy: 'GG/MM/AAAA',
  order_mdy: 'MM/GG/AAAA',
  order_ymd: 'AAAA/MM/GG',
  short_date_separator: 'Separatore data',
  short_year_2_digits: 'Anno a 2 cifre',
  long_weekday_format: 'Giorno della settimana',
  weekday_long: 'Completo (lunedì)',
  weekday_short: 'Breve (lun)',
  weekday_none: 'Nascosto',
  long_month_format: 'Nome del mese',
  month_long: 'Completo',
  month_short: 'Abbreviato',
  long_show_year: 'Mostra anno',
  capitalize_date: 'Iniziale maiuscola',

  show_entities: 'Mostra entità',
  entities_position: 'Posizione delle entità',
  entity_slot: 'Entità',
  entity: 'Entità',
  attribute: 'Attributo (opzionale)',
  attribute_helper: 'Lascia vuoto per mostrare lo stato principale',
  custom_name: 'Nome personalizzato (opzionale)',
  custom_icon: 'Icona personalizzata (opzionale)',
  custom_unit: 'Unità personalizzata (opzionale)',
  show_icon: 'Mostra icona',
  show_name: 'Mostra nome',
  show_unit: 'Mostra unità',

  card_padding: 'Spaziatura interna scheda',
  card_min_height: 'Altezza minima scheda',
  card_min_height_helper: '0 = altezza automatica',
  clock_font_size: 'Dimensione testo orologio',
  seconds_font_size: 'Dimensione secondi / AM-PM',
  date_font_size: 'Dimensione testo data',
  entity_font_size: 'Dimensione testo entità',
  content_gap: 'Spazio tra gli elementi',
  text_align: 'Allineamento',
  align_left: 'Sinistra',
  align_center: 'Centro',
  align_right: 'Destra',
  font_weight: 'Spessore carattere',
  font_family: 'Stile carattere',
  font_inherit: 'Predefinito del tema',
  font_sans: 'Sans-serif',
  font_serif: 'Serif',
  font_mono: 'Monospazio',
  font_digital: 'Digitale / Tabulare',
  font_rounded: 'Arrotondato',

  clock_color: 'Colore testo orologio',
  date_color: 'Colore testo data',
  entity_color: 'Colore testo entità',
  entity_icon_color: 'Colore icona entità',
  background_color: 'Colore sfondo scheda',
  background_opacity: 'Opacità sfondo',
  backdrop_blur: 'Sfocatura sfondo (vetro)',
  border_radius: 'Raggio angoli',
  hide_border: 'Nascondi bordo scheda',
  hide_shadow: 'Nascondi ombra scheda',
  reset_default: 'Ripristina',
};

const pt: TranslationStrings = {
  card_name: 'Simple Clock Card',
  card_description:
    'Cartão de relógio, data e entidades de estado altamente configurável através do editor visual.',
  unavailable: 'Indisponível',

  section_clock: 'Relógio',
  section_date_language: 'Data e Idioma',
  section_entities: 'Entidades de Estado (3)',
  section_sizing_typography: 'Tamanho e Tipografia',
  section_colors_transparency: 'Cores e Transparência',

  time_mode: 'Apresentação da hora',
  time_mode_h: 'Apenas horas (HH)',
  time_mode_hm: 'Horas e minutos (HH:MM)',
  time_mode_hms: 'Horas, minutos e segundos (HH:MM:SS)',
  use_24h: 'Formato de 24 horas',
  show_ampm: 'Mostrar AM/PM',
  ampm_position: 'Posição de AM/PM',
  ampm_right: 'Direita (em linha)',
  ampm_superscript: 'Sobrescrito',
  ampm_subscript: 'Subscrito',
  ampm_below: 'Abaixo do relógio',
  leading_zero: 'Zero inicial nas horas',
  blink_separator: 'Piscar separador ":"',
  seconds_style: 'Estilo dos segundos',
  seconds_inline: 'Mesmo tamanho (em linha)',
  seconds_superscript: 'Pequenos (sobrescrito)',
  seconds_subscript: 'Pequenos (subscrito)',
  timezone: 'Fuso horário (opcional)',
  timezone_helper: 'Deixar vazio para usar o do sistema (ex. Europe/Lisbon)',

  language: 'Idioma',
  language_auto: 'Automático (Home Assistant)',
  show_date: 'Mostrar data',
  date_position: 'Posição da data',
  position_top: 'Acima (acima do relógio)',
  position_bottom: 'Abaixo (abaixo do relógio)',
  date_format_type: 'Tipo de data',
  date_format_short: 'Data curta',
  date_format_long: 'Data longa',
  date_format_both: 'Dia da semana + Data curta',
  short_date_order: 'Ordem da data curta',
  order_dmy: 'DD/MM/AAAA',
  order_mdy: 'MM/DD/AAAA',
  order_ymd: 'AAAA/MM/DD',
  short_date_separator: 'Separador de data',
  short_year_2_digits: 'Ano com 2 dígitos',
  long_weekday_format: 'Dia da semana',
  weekday_long: 'Completo (segunda-feira)',
  weekday_short: 'Curto (seg)',
  weekday_none: 'Oculto',
  long_month_format: 'Nome do mês',
  month_long: 'Completo',
  month_short: 'Abreviado',
  long_show_year: 'Mostrar ano',
  capitalize_date: 'Primeira letra maiúscula',

  show_entities: 'Mostrar entidades',
  entities_position: 'Posição das entidades',
  entity_slot: 'Entidade',
  entity: 'Entidade',
  attribute: 'Atributo (opcional)',
  attribute_helper: 'Deixar vazio para mostrar o estado principal',
  custom_name: 'Nome personalizado (opcional)',
  custom_icon: 'Ícone personalizado (opcional)',
  custom_unit: 'Unidade personalizada (opcional)',
  show_icon: 'Mostrar ícone',
  show_name: 'Mostrar nome',
  show_unit: 'Mostrar unidade',

  card_padding: 'Espaçamento interno do cartão',
  card_min_height: 'Altura mínima do cartão',
  card_min_height_helper: '0 = altura automática',
  clock_font_size: 'Tamanho do texto do relógio',
  seconds_font_size: 'Tamanho de segundos / AM-PM',
  date_font_size: 'Tamanho do texto da data',
  entity_font_size: 'Tamanho das entidades',
  content_gap: 'Espaço entre elementos',
  text_align: 'Alinhamento',
  align_left: 'Esquerda',
  align_center: 'Centro',
  align_right: 'Direita',
  font_weight: 'Espessura da letra',
  font_family: 'Estilo de letra',
  font_inherit: 'Predefinido do tema',
  font_sans: 'Sans-serif',
  font_serif: 'Serif',
  font_mono: 'Monoespaçada',
  font_digital: 'Digital / Tabular',
  font_rounded: 'Arredondada',

  clock_color: 'Cor do texto do relógio',
  date_color: 'Cor do texto da data',
  entity_color: 'Cor do texto das entidades',
  entity_icon_color: 'Cor do ícone das entidades',
  background_color: 'Cor de fundo do cartão',
  background_opacity: 'Opacidade do fundo',
  backdrop_blur: 'Desfoque do fundo (vidro)',
  border_radius: 'Raio dos cantos',
  hide_border: 'Ocultar contorno do cartão',
  hide_shadow: 'Ocultar sombra do cartão',
  reset_default: 'Repor',
};

const ptBR: TranslationStrings = {
  card_name: 'Simple Clock Card',
  card_description:
    'Cartão de relógio, data e entidades de status altamente personalizável pelo editor visual.',
  unavailable: 'Indisponível',

  section_clock: 'Relógio',
  section_date_language: 'Data e Idioma',
  section_entities: 'Entidades de Status (3)',
  section_sizing_typography: 'Tamanho e Tipografia',
  section_colors_transparency: 'Cores e Transparência',

  time_mode: 'Exibição da hora',
  time_mode_h: 'Somente horas (HH)',
  time_mode_hm: 'Horas e minutos (HH:MM)',
  time_mode_hms: 'Horas, minutos e segundos (HH:MM:SS)',
  use_24h: 'Formato 24 horas',
  show_ampm: 'Exibir AM/PM',
  ampm_position: 'Posição de AM/PM',
  ampm_right: 'Direita (na linha)',
  ampm_superscript: 'Sobrescrito',
  ampm_subscript: 'Subscrito',
  ampm_below: 'Abaixo do relógio',
  leading_zero: 'Zero à esquerda nas horas',
  blink_separator: 'Piscar separador ":"',
  seconds_style: 'Estilo dos segundos',
  seconds_inline: 'Mesmo tamanho (na linha)',
  seconds_superscript: 'Pequenos (sobrescrito)',
  seconds_subscript: 'Pequenos (subscrito)',
  timezone: 'Fuso horário (opcional)',
  timezone_helper: 'Deixe vazio para usar o do sistema (ex. America/Sao_Paulo)',

  language: 'Idioma',
  language_auto: 'Automático (Home Assistant)',
  show_date: 'Exibir data',
  date_position: 'Posição da data',
  position_top: 'Acima (acima do relógio)',
  position_bottom: 'Abaixo (abaixo do relógio)',
  date_format_type: 'Tipo de data',
  date_format_short: 'Data curta',
  date_format_long: 'Data por extenso',
  date_format_both: 'Dia da semana + Data curta',
  short_date_order: 'Ordem da data curta',
  order_dmy: 'DD/MM/AAAA',
  order_mdy: 'MM/DD/AAAA',
  order_ymd: 'AAAA/MM/DD',
  short_date_separator: 'Separador de data',
  short_year_2_digits: 'Ano com 2 dígitos',
  long_weekday_format: 'Dia da semana',
  weekday_long: 'Completo (segunda-feira)',
  weekday_short: 'Curto (seg)',
  weekday_none: 'Oculto',
  long_month_format: 'Nome do mês',
  month_long: 'Completo',
  month_short: 'Abreviado',
  long_show_year: 'Exibir ano',
  capitalize_date: 'Primeira letra maiúscula',

  show_entities: 'Exibir entidades',
  entities_position: 'Posição das entidades',
  entity_slot: 'Entidade',
  entity: 'Entidade',
  attribute: 'Atributo (opcional)',
  attribute_helper: 'Deixe vazio para exibir o estado principal',
  custom_name: 'Nome personalizado (opcional)',
  custom_icon: 'Ícone personalizado (opcional)',
  custom_unit: 'Unidade personalizada (opcional)',
  show_icon: 'Exibir ícone',
  show_name: 'Exibir nome',
  show_unit: 'Exibir unidade',

  card_padding: 'Espaçamento interno do cartão',
  card_min_height: 'Altura mínima do cartão',
  card_min_height_helper: '0 = altura automática',
  clock_font_size: 'Tamanho da fonte do relógio',
  seconds_font_size: 'Tamanho dos segundos / AM-PM',
  date_font_size: 'Tamanho da fonte da data',
  entity_font_size: 'Tamanho das entidades',
  content_gap: 'Espaço entre elementos',
  text_align: 'Alinhamento',
  align_left: 'Esquerda',
  align_center: 'Centro',
  align_right: 'Direita',
  font_weight: 'Peso da fonte',
  font_family: 'Estilo da fonte',
  font_inherit: 'Padrão do tema',
  font_sans: 'Sans-serif',
  font_serif: 'Serif',
  font_mono: 'Monoespaçada',
  font_digital: 'Digital / Tabular',
  font_rounded: 'Arredondada',

  clock_color: 'Cor do texto do relógio',
  date_color: 'Cor do texto da data',
  entity_color: 'Cor do texto das entidades',
  entity_icon_color: 'Cor do ícone das entidades',
  background_color: 'Cor de fundo do cartão',
  background_opacity: 'Opacidade do fundo',
  backdrop_blur: 'Desfoque do fundo (vidro)',
  border_radius: 'Raio das bordas',
  hide_border: 'Ocultar borda do cartão',
  hide_shadow: 'Ocultar sombra do cartão',
  reset_default: 'Redefinir',
};

const ru: TranslationStrings = {
  card_name: 'Simple Clock Card',
  card_description:
    'Гибкая карточка часов, даты и объектов состояния с полным визуальным редактором.',
  unavailable: 'Недоступно',

  section_clock: 'Часы',
  section_date_language: 'Дата и язык',
  section_entities: 'Объекты состояния (3)',
  section_sizing_typography: 'Размер и шрифт',
  section_colors_transparency: 'Цвета и прозрачность',

  time_mode: 'Отображение времени',
  time_mode_h: 'Только часы (ЧЧ)',
  time_mode_hm: 'Часы и минуты (ЧЧ:ММ)',
  time_mode_hms: 'Часы, минуты и секунды (ЧЧ:ММ:СС)',
  use_24h: '24-часовой формат',
  show_ampm: 'Показывать AM/PM',
  ampm_position: 'Позиция AM/PM',
  ampm_right: 'Справа (в строку)',
  ampm_superscript: 'Надстрочный',
  ampm_subscript: 'Подстрочный',
  ampm_below: 'Под часами',
  leading_zero: 'Ведущий ноль для часов',
  blink_separator: 'Мигание разделителя ":"',
  seconds_style: 'Стиль секунд',
  seconds_inline: 'Обычный размер (в строку)',
  seconds_superscript: 'Мелкий (надстрочный)',
  seconds_subscript: 'Мелкий (подстрочный)',
  timezone: 'Часовой пояс (необязательно)',
  timezone_helper: 'Оставьте пустым для системного часового пояса (напр. Europe/Moscow)',

  language: 'Язык',
  language_auto: 'Автоматически (Home Assistant)',
  show_date: 'Показывать дату',
  date_position: 'Позиция даты',
  position_top: 'Сверху (над часами)',
  position_bottom: 'Снизу (под часами)',
  date_format_type: 'Формат даты',
  date_format_short: 'Короткая дата',
  date_format_long: 'Длинная дата',
  date_format_both: 'День недели + Короткая дата',
  short_date_order: 'Порядок короткой даты',
  order_dmy: 'ДД/ММ/ГГГГ',
  order_mdy: 'ММ/ДД/ГГГГ',
  order_ymd: 'ГГГГ/ММ/ДД',
  short_date_separator: 'Разделитель даты',
  short_year_2_digits: 'Год из 2 цифр',
  long_weekday_format: 'День недели',
  weekday_long: 'Полный (понедельник)',
  weekday_short: 'Короткий (пн)',
  weekday_none: 'Скрыть',
  long_month_format: 'Название месяца',
  month_long: 'Полное',
  month_short: 'Сокращённое',
  long_show_year: 'Показывать год',
  capitalize_date: 'С заглавной буквы',

  show_entities: 'Показывать объекты',
  entities_position: 'Позиция объектов',
  entity_slot: 'Объект',
  entity: 'Объект',
  attribute: 'Атрибут (необязательно)',
  attribute_helper: 'Оставьте пустым для основного состояния',
  custom_name: 'Своё имя (необязательно)',
  custom_icon: 'Своя иконка (необязательно)',
  custom_unit: 'Своя единица измерения (необязательно)',
  show_icon: 'Показывать иконку',
  show_name: 'Показывать имя',
  show_unit: 'Показывать единицу',

  card_padding: 'Внутренний отступ карточки',
  card_min_height: 'Минимальная высота карточки',
  card_min_height_helper: '0 = автоматическая высота',
  clock_font_size: 'Размер текста часов',
  seconds_font_size: 'Размер секунд / AM-PM',
  date_font_size: 'Размер текста даты',
  entity_font_size: 'Размер текста объектов',
  content_gap: 'Расстояние между элементами',
  text_align: 'Выравнивание',
  align_left: 'Слева',
  align_center: 'По центру',
  align_right: 'Справа',
  font_weight: 'Насыщенность шрифта',
  font_family: 'Стиль шрифта',
  font_inherit: 'Из темы',
  font_sans: 'Без засечек (Sans-serif)',
  font_serif: 'С засечками (Serif)',
  font_mono: 'Моноширинный',
  font_digital: 'Цифровой / Табличный',
  font_rounded: 'Скруглённый',

  clock_color: 'Цвет текста часов',
  date_color: 'Цвет текста даты',
  entity_color: 'Цвет текста объектов',
  entity_icon_color: 'Цвет иконок объектов',
  background_color: 'Цвет фона карточки',
  background_opacity: 'Непрозрачность фона',
  backdrop_blur: 'Размытие фона (стекло)',
  border_radius: 'Скругление углов',
  hide_border: 'Скрыть рамку карточки',
  hide_shadow: 'Скрыть тень карточки',
  reset_default: 'Сбросить',
};

const de: TranslationStrings = {
  card_name: 'Simple Clock Card',
  card_description:
    'Umfassend anpassbare Uhr-, Datums- und Statusentitäten-Karte mit visuellem Editor.',
  unavailable: 'Nicht verfügbar',

  section_clock: 'Uhr',
  section_date_language: 'Datum & Sprache',
  section_entities: 'Status-Entitäten (3)',
  section_sizing_typography: 'Größe & Typografie',
  section_colors_transparency: 'Farben & Transparenz',

  time_mode: 'Zeitanzeige',
  time_mode_h: 'Nur Stunden (SS)',
  time_mode_hm: 'Stunden & Minuten (SS:MM)',
  time_mode_hms: 'Stunden, Minuten & Sekunden (SS:MM:SS)',
  use_24h: '24-Stunden-Format',
  show_ampm: 'AM/PM anzeigen',
  ampm_position: 'AM/PM-Position',
  ampm_right: 'Rechts (in einer Zeile)',
  ampm_superscript: 'Hochgestellt',
  ampm_subscript: 'Tiefgestellt',
  ampm_below: 'Unter der Uhr',
  leading_zero: 'Führende Null bei Stunden',
  blink_separator: '":"-Trennzeichen blinken',
  seconds_style: 'Sekunden-Stil',
  seconds_inline: 'Gleiche Größe (inline)',
  seconds_superscript: 'Klein (hochgestellt)',
  seconds_subscript: 'Klein (tiefgestellt)',
  timezone: 'Zeitzone (optional)',
  timezone_helper: 'Leer lassen für Systemzeitzone (z. B. Europe/Berlin)',

  language: 'Sprache',
  language_auto: 'Automatisch (Home Assistant)',
  show_date: 'Datum anzeigen',
  date_position: 'Position des Datums',
  position_top: 'Oben (über der Uhr)',
  position_bottom: 'Unten (unter der Uhr)',
  date_format_type: 'Datumsformat',
  date_format_short: 'Kurzes Datum',
  date_format_long: 'Langes Datum',
  date_format_both: 'Wochentag + Kurzes Datum',
  short_date_order: 'Reihenfolge kurzes Datum',
  order_dmy: 'TT/MM/JJJJ',
  order_mdy: 'MM/TT/JJJJ',
  order_ymd: 'JJJJ/MM/TT',
  short_date_separator: 'Datumstrennzeichen',
  short_year_2_digits: '2-stelliges Jahr',
  long_weekday_format: 'Wochentag',
  weekday_long: 'Vollständig (Montag)',
  weekday_short: 'Kurz (Mo)',
  weekday_none: 'Ausgeblendet',
  long_month_format: 'Monatsname',
  month_long: 'Vollständig',
  month_short: 'Abgekürzt',
  long_show_year: 'Jahr anzeigen',
  capitalize_date: 'Erster Buchstabe groß',

  show_entities: 'Entitäten anzeigen',
  entities_position: 'Position der Entitäten',
  entity_slot: 'Entität',
  entity: 'Entität',
  attribute: 'Attribut (optional)',
  attribute_helper: 'Leer lassen, um den Hauptzustand anzuzeigen',
  custom_name: 'Eigener Name (optional)',
  custom_icon: 'Eigenes Symbol (optional)',
  custom_unit: 'Eigene Einheit (optional)',
  show_icon: 'Symbol anzeigen',
  show_name: 'Name anzeigen',
  show_unit: 'Einheit anzeigen',

  card_padding: 'Innenabstand der Karte',
  card_min_height: 'Mindesthöhe der Karte',
  card_min_height_helper: '0 = automatische Höhe',
  clock_font_size: 'Schriftgröße Uhrzeit',
  seconds_font_size: 'Größe Sekunden / AM-PM',
  date_font_size: 'Schriftgröße Datum',
  entity_font_size: 'Schriftgröße Entitäten',
  content_gap: 'Abstand zwischen Elementen',
  text_align: 'Ausrichtung',
  align_left: 'Links',
  align_center: 'Zentriert',
  align_right: 'Rechts',
  font_weight: 'Schriftstärke',
  font_family: 'Schriftart',
  font_inherit: 'Theme-Standard',
  font_sans: 'Sans-Serif',
  font_serif: 'Serif',
  font_mono: 'Monospace',
  font_digital: 'Digital / Tabellarisch',
  font_rounded: 'Abgerundet',

  clock_color: 'Textfarbe Uhrzeit',
  date_color: 'Textfarbe Datum',
  entity_color: 'Textfarbe Entitäten',
  entity_icon_color: 'Symbolfarbe Entitäten',
  background_color: 'Hintergrundfarbe der Karte',
  background_opacity: 'Hintergrund-Deckkraft',
  backdrop_blur: 'Hintergrund-Unschärfe (Glas)',
  border_radius: 'Eckenradius',
  hide_border: 'Kartenrahmen ausblenden',
  hide_shadow: 'Kartenschatten ausblenden',
  reset_default: 'Zurücksetzen',
};

const fr: TranslationStrings = {
  card_name: 'Simple Clock Card',
  card_description:
    'Carte horloge, date et entités d’état hautement personnalisable via l’éditeur visuel.',
  unavailable: 'Indisponible',

  section_clock: 'Horloge',
  section_date_language: 'Date et Langue',
  section_entities: 'Entités d’état (3)',
  section_sizing_typography: 'Taille et Typographie',
  section_colors_transparency: 'Couleurs et Transparence',

  time_mode: 'Affichage de l’heure',
  time_mode_h: 'Heures uniquement (HH)',
  time_mode_hm: 'Heures et minutes (HH:MM)',
  time_mode_hms: 'Heures, minutes et secondes (HH:MM:SS)',
  use_24h: 'Format 24 heures',
  show_ampm: 'Afficher AM/PM',
  ampm_position: 'Position de AM/PM',
  ampm_right: 'Droite (en ligne)',
  ampm_superscript: 'Exposant',
  ampm_subscript: 'Indice',
  ampm_below: 'Sous l’horloge',
  leading_zero: 'Zéro initial sur les heures',
  blink_separator: 'Clignotement du séparateur ":"',
  seconds_style: 'Style des secondes',
  seconds_inline: 'Même taille (en ligne)',
  seconds_superscript: 'Petites (exposant)',
  seconds_subscript: 'Petites (indice)',
  timezone: 'Fuseau horaire (optionnel)',
  timezone_helper: 'Laisser vide pour le fuseau système (ex. Europe/Paris)',

  language: 'Langue',
  language_auto: 'Automatique (Home Assistant)',
  show_date: 'Afficher la date',
  date_position: 'Position de la date',
  position_top: 'Haut (au-dessus de l’horloge)',
  position_bottom: 'Bas (sous l’horloge)',
  date_format_type: 'Format de date',
  date_format_short: 'Date courte',
  date_format_long: 'Date longue',
  date_format_both: 'Jour de la semaine + Date courte',
  short_date_order: 'Ordre de la date courte',
  order_dmy: 'JJ/MM/AAAA',
  order_mdy: 'MM/JJ/AAAA',
  order_ymd: 'AAAA/MM/JJ',
  short_date_separator: 'Séparateur de date',
  short_year_2_digits: 'Année sur 2 chiffres',
  long_weekday_format: 'Jour de la semaine',
  weekday_long: 'Complet (lundi)',
  weekday_short: 'Court (lun)',
  weekday_none: 'Masqué',
  long_month_format: 'Nom du mois',
  month_long: 'Complet',
  month_short: 'Abrégé',
  long_show_year: 'Afficher l’année',
  capitalize_date: 'Majuscule initiale',

  show_entities: 'Afficher les entités',
  entities_position: 'Position des entités',
  entity_slot: 'Entité',
  entity: 'Entité',
  attribute: 'Attribut (optionnel)',
  attribute_helper: 'Laisser vide pour afficher l’état principal',
  custom_name: 'Nom personnalisé (optionnel)',
  custom_icon: 'Icône personnalisée (optionnel)',
  custom_unit: 'Unité personnalisée (optionnel)',
  show_icon: 'Afficher l’icône',
  show_name: 'Afficher le nom',
  show_unit: 'Afficher l’unité',

  card_padding: 'Marge intérieure de la carte',
  card_min_height: 'Hauteur minimale de la carte',
  card_min_height_helper: '0 = hauteur automatique',
  clock_font_size: 'Taille du texte de l’horloge',
  seconds_font_size: 'Taille des secondes / AM-PM',
  date_font_size: 'Taille du texte de la date',
  entity_font_size: 'Taille des entités',
  content_gap: 'Espacement entre les éléments',
  text_align: 'Alignement',
  align_left: 'Gauche',
  align_center: 'Centre',
  align_right: 'Droite',
  font_weight: 'Épaisseur de police',
  font_family: 'Style de police',
  font_inherit: 'Thème par défaut',
  font_sans: 'Sans-serif',
  font_serif: 'Serif',
  font_mono: 'Chasse fixe (Monospace)',
  font_digital: 'Numérique / Tabulaire',
  font_rounded: 'Arrondie',

  clock_color: 'Couleur du texte de l’horloge',
  date_color: 'Couleur du texte de la date',
  entity_color: 'Couleur du texte des entités',
  entity_icon_color: 'Couleur de l’icône des entités',
  background_color: 'Couleur d’arrière-plan',
  background_opacity: 'Opacité de l’arrière-plan',
  backdrop_blur: 'Flou d’arrière-plan (verre)',
  border_radius: 'Rayon des coins',
  hide_border: 'Masquer la bordure',
  hide_shadow: 'Masquer l’ombre',
  reset_default: 'Réinitialiser',
};

const zhHans: TranslationStrings = {
  card_name: 'Simple Clock Card',
  card_description: '高度可定制的时钟、日期与状态实体卡片，支持全可视化编辑器与多语言。',
  unavailable: '不可用',

  section_clock: '时钟',
  section_date_language: '日期与语言',
  section_entities: '状态实体 (3)',
  section_sizing_typography: '尺寸与字体',
  section_colors_transparency: '颜色与透明度',

  time_mode: '时间显示模式',
  time_mode_h: '仅小时 (HH)',
  time_mode_hm: '小时和分钟 (HH:MM)',
  time_mode_hms: '小时、分钟和秒 (HH:MM:SS)',
  use_24h: '24 小时制',
  show_ampm: '显示 AM/PM',
  ampm_position: 'AM/PM 位置',
  ampm_right: '右侧（同行）',
  ampm_superscript: '上标',
  ampm_subscript: '下标',
  ampm_below: '时钟下方',
  leading_zero: '小时补零',
  blink_separator: '冒号 ":" 闪烁',
  seconds_style: '秒数样式',
  seconds_inline: '同字号（同行）',
  seconds_superscript: '小字号（上标）',
  seconds_subscript: '小字号（下标）',
  timezone: '时区（可选）',
  timezone_helper: '留空则使用系统时区（例如 Asia/Shanghai）',

  language: '语言',
  language_auto: '自动（跟随 Home Assistant）',
  show_date: '显示日期',
  date_position: '日期位置',
  position_top: '顶部（时钟上方）',
  position_bottom: '底部（时钟下方）',
  date_format_type: '日期类型',
  date_format_short: '短日期',
  date_format_long: '长日期',
  date_format_both: '星期 + 短日期',
  short_date_order: '短日期顺序',
  order_dmy: '日/月/年 (DD/MM/YYYY)',
  order_mdy: '月/日/年 (MM/DD/YYYY)',
  order_ymd: '年/月/日 (YYYY/MM/DD)',
  short_date_separator: '日期分隔符',
  short_year_2_digits: '两位年份',
  long_weekday_format: '星期显示',
  weekday_long: '完整（星期一）',
  weekday_short: '简短（周一）',
  weekday_none: '隐藏',
  long_month_format: '月份格式',
  month_long: '完整',
  month_short: '简短',
  long_show_year: '显示年份',
  capitalize_date: '首字母大写',

  show_entities: '显示状态实体',
  entities_position: '实体位置',
  entity_slot: '实体',
  entity: '实体',
  attribute: '属性（可选）',
  attribute_helper: '留空则显示实体的主状态',
  custom_name: '自定义名称（可选）',
  custom_icon: '自定义图标（可选）',
  custom_unit: '自定义单位（可选）',
  show_icon: '显示图标',
  show_name: '显示名称',
  show_unit: '显示单位',

  card_padding: '卡片内边距',
  card_min_height: '卡片最小高度',
  card_min_height_helper: '0 = 自动高度',
  clock_font_size: '时钟文字大小',
  seconds_font_size: '秒数 / AM-PM 大小',
  date_font_size: '日期文字大小',
  entity_font_size: '实体文字大小',
  content_gap: '元素间距',
  text_align: '对齐方式',
  align_left: '左对齐',
  align_center: '居中',
  align_right: '右对齐',
  font_weight: '字体粗细',
  font_family: '字体样式',
  font_inherit: '主题默认',
  font_sans: '无衬线 (Sans-serif)',
  font_serif: '衬线 (Serif)',
  font_mono: '等宽 (Monospace)',
  font_digital: '数字 / 等宽数字',
  font_rounded: '圆体',

  clock_color: '时钟文字颜色',
  date_color: '日期文字颜色',
  entity_color: '实体文字颜色',
  entity_icon_color: '实体图标颜色',
  background_color: '卡片背景颜色',
  background_opacity: '背景不透明度',
  backdrop_blur: '背景模糊（毛玻璃）',
  border_radius: '圆角半径',
  hide_border: '隐藏卡片边框',
  hide_shadow: '隐藏卡片阴影',
  reset_default: '恢复默认',
};

export const TRANSLATIONS: Record<ResolvedLanguage, TranslationStrings> = {
  en,
  es,
  it,
  pt,
  'pt-BR': ptBR,
  ru,
  de,
  fr,
  'zh-Hans': zhHans,
};

export const SUPPORTED_LANGUAGES: readonly { value: ResolvedLanguage; nativeLabel: string }[] = [
  { value: 'en', nativeLabel: 'English (en)' },
  { value: 'es', nativeLabel: 'Español (es)' },
  { value: 'it', nativeLabel: 'Italiano (it)' },
  { value: 'pt', nativeLabel: 'Português (pt)' },
  { value: 'pt-BR', nativeLabel: 'Português do Brasil (pt-BR)' },
  { value: 'ru', nativeLabel: 'Русский (ru)' },
  { value: 'de', nativeLabel: 'Deutsch (de)' },
  { value: 'fr', nativeLabel: 'Français (fr)' },
  { value: 'zh-Hans', nativeLabel: '简体中文 (zh-Hans)' },
];

export function resolveLanguage(
  configLanguage?: SupportedLanguage | string,
  hassLanguage?: string
): ResolvedLanguage {
  if (configLanguage && configLanguage !== 'auto') {
    return matchSupportedLanguage(configLanguage);
  }
  const browserLang =
    typeof navigator !== 'undefined' && navigator.language ? navigator.language : undefined;
  return matchSupportedLanguage(hassLanguage || browserLang || 'en');
}

function matchSupportedLanguage(raw: string): ResolvedLanguage {
  const normalized = raw.trim().replace(/_/g, '-').toLowerCase();
  if (!normalized) return 'en';

  if (normalized === 'pt-br' || normalized.startsWith('pt-br-')) {
    return 'pt-BR';
  }
  if (
    normalized === 'zh-hans' ||
    normalized.startsWith('zh-hans-') ||
    normalized === 'zh-cn' ||
    normalized === 'zh-sg' ||
    normalized === 'zh'
  ) {
    return 'zh-Hans';
  }

  const base = normalized.split('-')[0];
  switch (base) {
    case 'en':
    case 'es':
    case 'it':
    case 'pt':
    case 'ru':
    case 'de':
    case 'fr':
      return base;
    default:
      return 'en';
  }
}

export function localize(key: keyof TranslationStrings, lang: ResolvedLanguage): string {
  return TRANSLATIONS[lang]?.[key] ?? TRANSLATIONS.en[key] ?? String(key);
}
