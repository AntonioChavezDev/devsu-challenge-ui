import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { CreateFinancialProductPageComponent } from './create-financial-product-page.component';
import { FinancialProductsService } from '../../services/financial-products.service';
import { FinancialProductFormComponent } from '../../components/financial-product-form/financial-product-form.component';
import { FinancialProduct } from '../../models/financial-product.interface';
import { transformDateFormat } from '../../utils/date.util';
import { of, throwError } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

describe('CreateFinancialProductPageComponent', () => {
  let component: CreateFinancialProductPageComponent;
  let fixture: ComponentFixture<CreateFinancialProductPageComponent>;
  let mockFinancialProductsService: jasmine.SpyObj<FinancialProductsService>;

  beforeEach(async () => {
    const financialProductsServiceSpy = jasmine.createSpyObj(
      'FinancialProductsService',
      ['create']
    );

    await TestBed.configureTestingModule({
      imports: [CreateFinancialProductPageComponent, ReactiveFormsModule],
      providers: [
        {
          provide: FinancialProductsService,
          useValue: financialProductsServiceSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateFinancialProductPageComponent);
    component = fixture.componentInstance;
    mockFinancialProductsService = TestBed.inject(
      FinancialProductsService
    ) as jasmine.SpyObj<FinancialProductsService>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('createProduct', () => {
    it('should create product and set success message on successful creation', () => {
      const controls = {
        id: { value: '1' },
        name: { value: 'Product Name' },
        description: { value: 'Product Description' },
        logo: { value: 'logo.png' },
        dateRelease: { value: '23/07/2024' },
        dateRevision: { value: '23/07/2025' },
      };

      component.financialProductForm.form = {
        invalid: false,
        controls: controls,
      } as any;

      const financialProduct: FinancialProduct = {
        id: '1',
        name: 'Product Name',
        description: 'Product Description',
        logo: 'logo.png',
        date_release: new Date(transformDateFormat('23/07/2024')),
        date_revision: new Date(transformDateFormat('23/07/2025')),
      };

      mockFinancialProductsService.create.and.returnValue(of([]));

      component.createProduct();

      expect(mockFinancialProductsService.create).toHaveBeenCalledWith(
        financialProduct
      );
      expect(component.message).toBe('Registro guardado con éxito!');
      expect(component.isLoading).toBeFalse();
    });

    it('should handle error and set error message on failure', () => {
      const controls = {
        id: { value: '1' },
        name: { value: 'Product Name' },
        description: { value: 'Product Description' },
        logo: { value: 'logo.png' },
        dateRelease: { value: '23/07/2024' },
        dateRevision: { value: '23/07/2025' },
      };

      component.financialProductForm.form = {
        invalid: false,
        controls: controls,
      } as any;

      mockFinancialProductsService.create.and.returnValue(
        throwError(() => new Error('Error'))
      );

      component.createProduct();

      expect(mockFinancialProductsService.create).toHaveBeenCalled();
      expect(component.message).toBe('Ha ocurrido un error');
      expect(component.isLoading).toBeFalse();
    });

    it('should not create product if form is invalid', () => {
      component.financialProductForm.form = {
        invalid: true,
      } as any;

      component.createProduct();

      expect(mockFinancialProductsService.create).not.toHaveBeenCalled();
    });
  });
});
