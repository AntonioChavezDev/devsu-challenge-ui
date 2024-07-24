import { AbstractControl } from '@angular/forms';
import { dateValidator } from './date.validator';

describe('dateValidator', () => {
  let validator: ReturnType<typeof dateValidator>;

  beforeEach(() => {
    validator = dateValidator();
  });

  it('should return null for a valid future date', () => {
    const control = { value: '25/12/2025' } as AbstractControl;
    const result = validator(control);
    expect(result).toBeNull();
  });

  it('should return { invalidDate: true } for an invalid date format', () => {
    const control = { value: '2025-12-25' } as AbstractControl;
    const result = validator(control);
    expect(result).toEqual({ invalidDate: true });
  });

  it('should return { dateInPast: true } for a date in the past', () => {
    const control = { value: '01/01/2020' } as AbstractControl;
    const result = validator(control);
    expect(result).toEqual({ dateInPast: true });
  });

  it('should return null for a valid current date', () => {
    const today = new Date();
    const todayStr = `${('0' + today.getDate()).slice(-2)}/${(
      '0' +
      (today.getMonth() + 1)
    ).slice(-2)}/${today.getFullYear()}`;
    const control = { value: todayStr } as AbstractControl;
    const result = validator(control);
    expect(result).toBeNull();
  });

  it('should return { invalidDate: true } for an empty value', () => {
    const control = { value: '' } as AbstractControl;
    const result = validator(control);
    expect(result).toEqual({ invalidDate: true });
  });
});
