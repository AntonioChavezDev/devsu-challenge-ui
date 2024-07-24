import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormErrorComponent } from './form-error.component';
import { FormControl, Validators } from '@angular/forms';

describe('FormErrorComponent', () => {
  let component: FormErrorComponent;
  let fixture: ComponentFixture<FormErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormErrorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getErrors', () => {
    it('should return error keys if control has errors', () => {
      const control = new FormControl('', {
        validators: [Validators.required],
        updateOn: 'blur',
      });
      control.setErrors({ required: true });

      component.control = control;
      const errors = component.getErrors();

      expect(errors).toEqual(['required']);
    });

    it('should return null if control has no errors', () => {
      const control = new FormControl('');
      component.control = control;
      const errors = component.getErrors();

      expect(errors).toBeNull();
    });

    it('should log an error if control is not provided', () => {
      spyOn(console, 'error');
      component.control = undefined;

      component.getErrors();

      expect(console.error).toHaveBeenCalledWith('Control not provided');
    });
  });
});
