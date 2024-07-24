import { Component, OnInit } from '@angular/core';
import { FinancialProductsService } from '../../services/financial-products.service';
import { FinancialProduct } from '../../models/financial-product.interface';
import { CommonModule } from '@angular/common';
import { InputSearchComponent } from '../input-search/input-search.component';
import { TableComponent } from '../table/table.component';
import { Column, TableConfig } from '../table/models/table.interface';
import { ButtonComponent } from '../button/button.component';
import { Router } from '@angular/router';
import { MY_ROUTES } from '../../constants/my-routes.constants';

@Component({
  selector: 'app-financial-products-table',
  standalone: true,
  imports: [
    CommonModule,
    InputSearchComponent,
    TableComponent,
    ButtonComponent,
  ],
  templateUrl: './financial-products-table.component.html',
  styleUrl: './financial-products-table.component.scss',
})
export class FinancialProductsTableComponent implements OnInit {
  financialProducts: FinancialProduct[] = [];
  error: any;
  config: TableConfig = {
    enablePaginator: true,
    enableActions: true,
  };
  columns: Column[] = [
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
  ];
  rows: any[] = [];

  isLoading: boolean = false;

  constructor(
    private financialProductService: FinancialProductsService,
    private router: Router
  ) {}

  search(searchValue: string) {
    searchValue = searchValue.toLowerCase();
    if (searchValue === '') {
      this.rows = this.financialProducts;
      return;
    }

    this.rows = this.financialProducts.filter(
      (value: FinancialProduct) =>
        value.description.toLowerCase().includes(searchValue) ||
        value.id.toLowerCase().includes(searchValue) ||
        value.name.toLowerCase().includes(searchValue)
    );
  }

  private getFinancialProducts() {
    this.isLoading = true;
    this.error = '';
    this.financialProductService.getFinancialProducts().subscribe({
      next: (value: any) => {
        this.financialProducts = value['data'] as FinancialProduct[];
        this.rows = this.financialProducts;
      },
      error: () => {
        this.error =
          'Ocurrió un error al obtener los resultados. Prueba nuevamente, por favor.';
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  onEditProductPressed(financialProduct: FinancialProduct) {
    this.router.navigate([MY_ROUTES.EDIT_FINANCIAL_PRODUCT], {
      queryParams: { data: JSON.stringify(financialProduct) },
    });
  }

  onAddProductPressed() {
    this.router.navigate([MY_ROUTES.CREATE_FINANCIAL_PRODUCT]);
  }

  ngOnInit(): void {
    this.getFinancialProducts();
  }
}
