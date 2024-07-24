import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const datePattern =
      /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/(\d{4})$/;
    const value = control.value;

    if (!value || !datePattern.test(value)) {
      return { invalidDate: true };
    }

    const [day, month, year] = value.split('/').map(Number);
    const inputDate = new Date(year, month - 1, day);
    const currentDate = new Date();

    inputDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    if (inputDate < currentDate) {
      return { dateInPast: true };
    }

    return null;
  };
}
