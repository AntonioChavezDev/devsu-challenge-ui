import { Component, OnInit } from '@angular/core';
import { FinancialProductsService } from '../../services/financial-products.service';
import { FinancialProduct } from '../../models/financial-product.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-financial-products-table',
  standalone: true,
  imports: [CommonModule],
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
        //this.financialProducts = value;
        for (let index = 0; index < 2; index++) {
          this.financialProducts.push({
            date_release: new Date(),
            date_revision: new Date(),
            description: 'Lorem Ipsum',
            id: '12345',
            logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
            name: 'Credit Card',
          });
        }
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
