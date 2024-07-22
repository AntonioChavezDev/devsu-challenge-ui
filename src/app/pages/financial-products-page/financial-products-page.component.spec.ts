import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialProductsPageComponent } from './financial-products-page.component';

describe('FinancialProductsListComponent', () => {
  let component: FinancialProductsPageComponent;
  let fixture: ComponentFixture<FinancialProductsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialProductsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialProductsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
