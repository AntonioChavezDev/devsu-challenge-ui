import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialProductsTableComponent } from './financial-products-table.component';

describe('FinancialProductsTableComponent', () => {
  let component: FinancialProductsTableComponent;
  let fixture: ComponentFixture<FinancialProductsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialProductsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialProductsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
