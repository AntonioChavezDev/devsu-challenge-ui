import { Component, OnInit } from '@angular/core';
import { FinancialProductsService } from '../../services/financial-products.service';
import { FinancialProduct } from '../../models/financial-product.interface';
import { CommonModule } from '@angular/common';
import { InputSearchComponent } from '../input-search/input-search.component';
import { TableComponent } from '../table/table.component';
import { TableModel } from '../table/models/table.interface';

@Component({
  selector: 'app-financial-products-table',
  standalone: true,
  imports: [CommonModule, InputSearchComponent, TableComponent],
  templateUrl: './financial-products-table.component.html',
  styleUrl: './financial-products-table.component.scss',
})
export class FinancialProductsTableComponent implements OnInit {
  financialProducts: FinancialProduct[] = [];
  error: any;
  model: TableModel = {
    columns: [
      {
        property: 'logo',
        title: 'Logo',
        columnType: 'img',
      },
      {
        property: 'name',
        title: 'Nombre del producto',
      },
      {
        property: 'description',
        title: 'Descripción',
        enableIcon: true,
      },
      {
        property: 'date_release',
        title: 'Fecha de liberación',
        enableIcon: true,
        columnType: 'date',
      },
      {
        property: 'date_revision',
        title: 'Fecha de reestructuración',
        enableIcon: true,
        columnType: 'date',
      },
    ],
    rows: [],
    enablePaginator: true,
  };

  constructor(private financialProductService: FinancialProductsService) {}

  search(searchValue: string) {
    searchValue = searchValue.toLowerCase();
    if (searchValue === '') {
      this.model.rows = this.financialProducts;
      return;
    }

    this.model.rows = this.financialProducts.filter(
      (value: FinancialProduct) =>
        value.description.toLowerCase().includes(searchValue) ||
        value.id.toLowerCase().includes(searchValue) ||
        value.name.toLowerCase().includes(searchValue)
    );
  }

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
        this.model.rows = this.financialProducts;
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
