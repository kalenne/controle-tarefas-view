import { NgxMatDateFormats } from "@angular-material-components/datetime-picker";

export const DATE_TIME_FORMAT: NgxMatDateFormats = {
  parse: {
    dateInput: "DD/MM/YYYY, HH:MM"
  },
  display: {
    dateInput: "DD/MM/YYYY, LTS",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY"
  }
};