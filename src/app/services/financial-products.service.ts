import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { FinancialProduct } from '../models/financial-product.interface';
import { HttpClient } from '@angular/common/http';
import { EditFinancialProduct } from '../models/edit-financial-product.interface';

@Injectable({
  providedIn: 'root',
})
export class FinancialProductsService {
  readonly baseUrl = 'bp/products';

  constructor(private readonly http: HttpClient) {}

  create(financialProduct: FinancialProduct) {
    return this.http.post<FinancialProduct[]>(
      `${this.baseUrl}`,
      financialProduct
    );
  }

  getFinancialProducts(): Observable<FinancialProduct[]> {
    return this.http.get<FinancialProduct[]>(`${this.baseUrl}`);
  }

  update(id: string, financialProduct: EditFinancialProduct) {
    return this.http.put<FinancialProduct[]>(
      `${this.baseUrl}/${id}`,
      financialProduct
    );
  }

  delete(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  checkIdExists(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/verification/${id}`);
  }
}
