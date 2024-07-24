import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { DeleteFinancialProductComponent } from './delete-financial-product.component';
import { FinancialProductsService } from '../../services/financial-products.service';
import { FinancialProduct } from '../../models/financial-product.interface';
import { of, throwError } from 'rxjs';

describe('DeleteFinancialProductComponent', () => {
  let component: DeleteFinancialProductComponent;
  let fixture: ComponentFixture<DeleteFinancialProductComponent>;
  let mockFinancialProductsService: jasmine.SpyObj<FinancialProductsService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('FinancialProductsService', ['delete']);

    await TestBed.configureTestingModule({
      imports: [DeleteFinancialProductComponent],
      providers: [{ provide: FinancialProductsService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteFinancialProductComponent);
    component = fixture.componentInstance;
    mockFinancialProductsService = TestBed.inject(
      FinancialProductsService
    ) as jasmine.SpyObj<FinancialProductsService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onModalClose', () => {
    it('should set productToDelete to null', () => {
      component.productToDelete = {
        id: '1',
        name: 'Product',
      } as FinancialProduct;
      component.onModalClose();
      expect(component.productToDelete).toBeNull();
    });
  });

  describe('deleteProduct', () => {
    it('should call FinancialProductsService.delete with correct id and set success message on success', () => {
      const product = { id: '1', name: 'Product' } as FinancialProduct;
      component.productToDelete = product;
      mockFinancialProductsService.delete.and.returnValue(of({}));

      component.deleteProduct();

      expect(mockFinancialProductsService.delete).toHaveBeenCalledWith(
        product.id
      );
      expect(component.message).toBe('Registro eliminado con éxito!');
      expect(component.isLoading).toBeFalse();
    });

    it('should set error message and stop loading on error', fakeAsync(() => {
      const product = { id: '1', name: 'Product' } as FinancialProduct;
      component.productToDelete = product;
      mockFinancialProductsService.delete.and.returnValue(
        throwError(() => new Error('Error'))
      );

      component.deleteProduct();
      tick();

      expect(mockFinancialProductsService.delete).toHaveBeenCalledWith(
        product.id
      );
      expect(component.message).toBe('Ha ocurrido un error');
      expect(component.isLoading).toBeFalse();
    }));
  });
});
