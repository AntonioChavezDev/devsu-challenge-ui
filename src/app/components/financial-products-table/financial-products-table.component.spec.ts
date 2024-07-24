import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { FinancialProductsTableComponent } from './financial-products-table.component';
import { FinancialProductsService } from '../../services/financial-products.service';
import { Router } from '@angular/router';
import { ModalService } from '../../services/modal.service';
import { FinancialProduct } from '../../models/financial-product.interface';
import { MY_ROUTES } from '../../constants/my-routes.constants';

describe('FinancialProductsTableComponent', () => {
  let component: FinancialProductsTableComponent;
  let fixture: ComponentFixture<FinancialProductsTableComponent>;
  let mockFinancialProductsService: jasmine.SpyObj<FinancialProductsService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockModalService: jasmine.SpyObj<ModalService>;

  beforeEach(async () => {
    const financialProductsServiceSpy = jasmine.createSpyObj(
      'FinancialProductsService',
      ['getFinancialProducts']
    );
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const modalServiceSpy = jasmine.createSpyObj('ModalService', ['openModal']);

    await TestBed.configureTestingModule({
      imports: [FinancialProductsTableComponent],
      providers: [
        {
          provide: FinancialProductsService,
          useValue: financialProductsServiceSpy,
        },
        { provide: Router, useValue: routerSpy },
        { provide: ModalService, useValue: modalServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FinancialProductsTableComponent);
    component = fixture.componentInstance;
    mockFinancialProductsService = TestBed.inject(
      FinancialProductsService
    ) as jasmine.SpyObj<FinancialProductsService>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    mockModalService = TestBed.inject(
      ModalService
    ) as jasmine.SpyObj<ModalService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('search', () => {
    it('should filter rows based on search value', () => {
      const products = [
        { id: '1', name: 'Product1', description: 'Description1' },
        { id: '2', name: 'Product2', description: 'Description2' },
      ] as FinancialProduct[];

      component.financialProducts = products;
      component.search('Product1');

      expect(component.rows).toEqual([products[0]]);
    });

    it('should reset rows when search value is empty', () => {
      const products = [
        { id: '1', name: 'Product1', description: 'Description1' },
        { id: '2', name: 'Product2', description: 'Description2' },
      ] as FinancialProduct[];

      component.financialProducts = products;
      component.search('');

      expect(component.rows).toEqual(products);
    });
  });

  describe('getFinancialProducts', () => {
    it('should set financialProducts and rows on success', () => {
      const products = {
        data: [{ id: '1', name: 'Product1', description: 'Description1' }],
      } as any;
      mockFinancialProductsService.getFinancialProducts.and.returnValue(
        of(products)
      );

      (component as any).getFinancialProducts();

      expect(component.financialProducts).toEqual(products.data);
      expect(component.rows).toEqual(products.data);
      expect(component.isLoading).toBeFalse();
    });

    it('should handle error and set error message', () => {
      mockFinancialProductsService.getFinancialProducts.and.returnValue(
        throwError(() => new Error('Error'))
      );

      (component as any).getFinancialProducts();

      expect(component.error).toBe(
        'Ocurrió un error al obtener los resultados. Prueba nuevamente, por favor.'
      );
      expect(component.isLoading).toBeFalse();
    });
  });

  describe('onEditProductPressed', () => {
    it('should navigate to edit page with product data', () => {
      const product = { id: '1', name: 'Product1' } as FinancialProduct;
      component.onEditProductPressed(product);

      expect(mockRouter.navigate).toHaveBeenCalledWith(
        [MY_ROUTES.EDIT_FINANCIAL_PRODUCT],
        {
          queryParams: { data: JSON.stringify(product) },
        }
      );
    });
  });

  describe('onDeleteProductPressed', () => {
    it('should set productToDelete and open modal', () => {
      const product = { id: '1', name: 'Product1' } as FinancialProduct;
      component.onDeleteProductPressed(product);

      expect(component.productToDelete).toEqual(product);
      expect(mockModalService.openModal).toHaveBeenCalled();
    });
  });

  describe('onAddProductPressed', () => {
    it('should navigate to create product page', () => {
      component.onAddProductPressed();

      expect(mockRouter.navigate).toHaveBeenCalledWith([
        MY_ROUTES.CREATE_FINANCIAL_PRODUCT,
      ]);
    });
  });

  afterEach(() => {
    fixture.destroy();
  });
});
