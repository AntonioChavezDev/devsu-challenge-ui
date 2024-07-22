import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FinancialProduct } from '../models/financial-product.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FinancialProductsService {
  readonly baseUrl = 'bp/';

  constructor(private readonly http: HttpClient) {}

  getFinancialProducts(): Observable<FinancialProduct[]> {
    return this.http.get<FinancialProduct[]>(`${this.baseUrl}products`);
  }
}
