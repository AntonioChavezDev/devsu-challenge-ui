import { Component, OnInit } from '@angular/core';
import { FinancialProductsService } from '../../services/financial-products.service';
import { FinancialProduct } from '../../models/financial-product.interface';

@Component({
  selector: 'app-financial-products-table',
  standalone: true,
  imports: [],
  templateUrl: './financial-products-table.component.html',
  styleUrl: './financial-products-table.component.scss',
})
export class FinancialProductsTableComponent implements OnInit {
  financialProducts: FinancialProduct[] = [];
  error: any;

  constructor(private financialProductService: FinancialProductsService) {}

  private getFinancialProducts() {
    this.error = '';
    this.financialProductService.getFinancialProducts().subscribe({
      next: (value) => {
        this.financialProducts = value;
      },
      error: () => {
        this.error =
          'Ocurrió un error al obtener los resultados. Prueba nuevamente, por favor.';
      },
    });
  }

  ngOnInit(): void {
    this.getFinancialProducts();
  }
}
