import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFinancialProductPageComponent } from './edit-financial-product-page.component';
import { FinancialProductsService } from '../../services/financial-products.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('EditFinancialProductPageComponent', () => {
  let component: EditFinancialProductPageComponent;
  let fixture: ComponentFixture<EditFinancialProductPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditFinancialProductPageComponent],
      providers: [
        FinancialProductsService,
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({
              data: JSON.stringify({ id: '123', name: 'Mock Product' }),
            }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditFinancialProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
