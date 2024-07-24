import { TestBed } from '@angular/core/testing';

import { FinancialProductsService } from './financial-products.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('FinancialProductsService', () => {
  let service: FinancialProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(FinancialProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
