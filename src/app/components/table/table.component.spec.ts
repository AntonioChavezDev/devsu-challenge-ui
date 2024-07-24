import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { FinancialProduct } from '../../models/financial-product.interface';
import { SimpleChanges } from '@angular/core';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onEditFinancialProduct', () => {
    it('should emit onEditClick with correct product', () => {
      const product: FinancialProduct = {
        id: '1',
        name: 'Product1',
      } as FinancialProduct;
      spyOn(component.onEditClick, 'emit');

      component.onEditFinancialProduct(product);

      expect(component.onEditClick.emit).toHaveBeenCalledWith(product);
    });
  });

  describe('onDeleteFinancialProduct', () => {
    it('should emit onDeleteClick with correct product', () => {
      const product: FinancialProduct = {
        id: '1',
        name: 'Product1',
      } as FinancialProduct;
      spyOn(component.onDeleteClick, 'emit');

      component.onDeleteFinancialProduct(product);

      expect(component.onDeleteClick.emit).toHaveBeenCalledWith(product);
    });
  });

  describe('Pagination', () => {
    it('should update paginated items on page change', () => {
      component.rows = [
        { id: '1', name: 'Product1' },
        { id: '2', name: 'Product2' },
        { id: '3', name: 'Product3' },
        { id: '4', name: 'Product4' },
        { id: '5', name: 'Product5' },
        { id: '6', name: 'Product6' },
      ];
      component.itemsPerPage = 2;
      component.onPageChange(2);

      expect(component.paginatedItems).toEqual([
        { id: '3', name: 'Product3' },
        { id: '4', name: 'Product4' },
      ]);
    });

    it('should update paginated items on itemsPerPage change', () => {
      component.rows = [
        { id: '1', name: 'Product1' },
        { id: '2', name: 'Product2' },
        { id: '3', name: 'Product3' },
      ];
      component.itemsPerPage = 1;
      component.onItemsPerPageChange(2);

      expect(component.paginatedItems).toEqual([
        { id: '1', name: 'Product1' },
        { id: '2', name: 'Product2' },
      ]);
    });
  });

  describe('ngOnChanges', () => {
    it('should call updatePaginatedProducts on changes to rows', () => {
      spyOn(component as any, 'updatePaginatedProducts').and.callThrough();
      const changes: SimpleChanges = {
        rows: {
          previousValue: [],
          currentValue: [{ id: '1', name: 'Product1' }],
          firstChange: true,
          isFirstChange: () => true,
        },
      };

      component.ngOnChanges(changes);

      expect((component as any).updatePaginatedProducts).toHaveBeenCalled();
    });
  });

  describe('getDate', () => {
    it('should return a Date object when passed a string date', () => {
      const dateStr = '2024-07-24';
      const result = component.getDate(dateStr);
      expect(result).toEqual(new Date(dateStr));
    });

    it('should return a Date object when passed a Date object', () => {
      const date = new Date('2024-07-24');
      const result = component.getDate(date);
      expect(result).toEqual(date);
    });

    it('should return a Date object when passed an object with date string', () => {
      const dateObj = { date: '2024-07-24' };
      const result = component.getDate(dateObj.date);
      expect(result).toEqual(new Date(dateObj.date));
    });
  });
});
