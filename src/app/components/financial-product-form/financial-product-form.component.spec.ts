import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialProductFormComponent } from './financial-product-form.component';
import { FinancialProductsService } from '../../services/financial-products.service';
import { IdExistsValidator } from '../../validators/id-exists.validator';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('FinancialProductFormComponent', () => {
  let component: FinancialProductFormComponent;
  let fixture: ComponentFixture<FinancialProductFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialProductFormComponent],
      providers: [
        IdExistsValidator,
        FinancialProductsService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FinancialProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
