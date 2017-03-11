export const CITIES = [
  { id: 'Beograd', text: 'Beograd'},
  { id: 'Novi Sad', text: 'Novi Sad'},
  { id: 'Cacak', text: 'Cacak'},
  { id: 'Nis', text: 'Nis'},
  { id: 'Uzice', text: 'Uzice'},
  { id: 'Kragujevac', text: 'Kragujevac'},
  { id: 'Zrenjanin', text: 'Zrenjanin'},
  { id: 'Subotica', text: 'Subotica'},
  { id: 'Sabac', text: 'Sabac'},
  { id: 'Jagodina', text: 'Jagodina'},
  { id: 'Smederevo', text: 'Smederevo'},
  { id: 'Leskovac', text: 'Leskovac'},
  { id: 'Krusevac', text: 'Krusevac'}
];

export const GENDER_LIST = [
  { id: 1, text: 'Female'},
  { id: 2, text: 'Male'},
  { id: 3, text: 'Other'}
];

export const PROFFESSIONS = [
  { id: 'Electrician', text: 'Electrician'},
  { id: 'Plumber', text: 'Plumber'},
  { id: 'Housekeeper', text: 'Housekeeper'},
  { id: 'Gardener', text: 'Gardener'},
  { id: 'Bricklayer', text: 'Bricklayer'},
];

export const CALENDAR_SETTINGS = {
    dateFormat: 'dd mmm yyyy',
    showClearDateBtn: false,
    selectionTxtFontSize: '14 px',
    showTodayBtn: false,
    sunHighlight: false,
    minYear: 1939,
    maxYear: 2004,
    markCurrentDay: false,
    disableUntil: {year: 1940, month: 1, day: 1},
    disableSince: {year: 2003, month: 1, day: 1}
};

export interface Option {
  id: any;
  text: string;
};
