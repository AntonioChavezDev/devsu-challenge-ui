import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialProductsPageComponent } from './financial-products-page.component';
import { FinancialProductsService } from '../../services/financial-products.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('FinancialProductsListComponent', () => {
  let component: FinancialProductsPageComponent;
  let fixture: ComponentFixture<FinancialProductsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialProductsPageComponent],
      providers: [
        FinancialProductsService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FinancialProductsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
