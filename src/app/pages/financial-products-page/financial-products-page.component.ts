import { Component } from '@angular/core';
import { FinancialProductsTableComponent } from '../../components/financial-products-table/financial-products-table.component';

@Component({
  selector: 'app-financial-products-list',
  standalone: true,
  imports: [FinancialProductsTableComponent],
  templateUrl: './financial-products-page.component.html',
  styleUrl: './financial-products-page.component.scss',
})
export class FinancialProductsPageComponent {}
