import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { FinancialProductsService } from '../services/financial-products.service';
import { IdExistsValidator } from './id-exists.validator'; // Ajusta la ruta según sea necesario
import { AbstractControl } from '@angular/forms';

describe('IdExistsValidator', () => {
  let validator: IdExistsValidator;
  let mockFinancialProductsService: jasmine.SpyObj<FinancialProductsService>;

  beforeEach(() => {
    const financialProductsServiceSpy = jasmine.createSpyObj(
      'FinancialProductsService',
      ['checkIdExists']
    );

    TestBed.configureTestingModule({
      providers: [
        IdExistsValidator,
        {
          provide: FinancialProductsService,
          useValue: financialProductsServiceSpy,
        },
      ],
    });

    validator = TestBed.inject(IdExistsValidator);
    mockFinancialProductsService = TestBed.inject(
      FinancialProductsService
    ) as jasmine.SpyObj<FinancialProductsService>;
  });

  it('should return { idExists: true } if the ID exists', (done: DoneFn) => {
    mockFinancialProductsService.checkIdExists.and.returnValue(of(true));

    const control = { value: 'existing-id' } as AbstractControl;
    validator.validate(control).subscribe((result) => {
      expect(result).toEqual({ idExists: true });
      done();
    });
  });

  it('should return null if the ID does not exist', (done: DoneFn) => {
    mockFinancialProductsService.checkIdExists.and.returnValue(of(false));

    const control = { value: 'new-id' } as AbstractControl;
    validator.validate(control).subscribe((result) => {
      expect(result).toBeNull();
      done();
    });
  });

  it('should return { asyncError: true } if there is an error in the service', (done: DoneFn) => {
    mockFinancialProductsService.checkIdExists.and.returnValue(
      throwError(() => new Error('Service error'))
    );

    const control = { value: 'some-id' } as AbstractControl;
    validator.validate(control).subscribe((result) => {
      expect(result).toEqual({ asyncError: true });
      done();
    });
  });
});
