import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  FormGroup,
} from '@angular/forms';

export function dateReleaseValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control as FormGroup;
    const dateReleaseControl = formGroup.get('dateRelease');
    const dateRevisionControl = formGroup.get('dateRevision');

    if (!dateReleaseControl || !dateRevisionControl) {
      return null;
    }

    const datePattern =
      /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/(\d{4})$/;
    const dateReleaseValue = dateReleaseControl.value;
    const dateRevisionValue = dateRevisionControl.value;

    if (
      !datePattern.test(dateReleaseValue) ||
      !datePattern.test(dateRevisionValue)
    ) {
      return null;
    }

    const [dayRelease, monthRelease, yearRelease] = dateReleaseValue
      .split('/')
      .map(Number);
    const [dayRevision, monthRevision, yearRevision] = dateRevisionValue
      .split('/')
      .map(Number);

    const dateRevision = new Date(yearRevision, monthRevision - 1, dayRevision);

    if (
      dateRevision <= new Date(yearRelease + 1, monthRelease - 1, dayRelease)
    ) {
      return { invalidRevisionDate: true };
    }

    return null;
  };
}
