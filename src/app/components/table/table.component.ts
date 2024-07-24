import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Column, TableConfig } from './models/table.interface';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from '../paginator/paginator.component';
import { DropdownMenuComponent } from '../dropdown-menu/dropdown-menu.component';
import { FinancialProduct } from '../../models/financial-product.interface';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, PaginatorComponent, DropdownMenuComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit, OnChanges {
  @Input() config: TableConfig = {
    enablePaginator: true,
    enableActions: true,
  };
  @Input() columns: Column[] = [];
  @Input() rows: any[] = [];
  @Input() isLoading: boolean = false;
  @Output() onEditClick = new EventEmitter<FinancialProduct>();

  paginatedItems: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;

  onEditFinancialProduct(financialProduct: FinancialProduct) {
    this.onEditClick.emit(financialProduct);
  }

  getDate(date: String | Date | object): Date {
    if (date instanceof Date) {
      return date;
    }

    return new Date(date as string);
  }

  //#region Paginator handler
  private updatePaginatedProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    if (Array.isArray(this.rows)) {
      this.paginatedItems = this.rows.slice(startIndex, endIndex);
    } else {
      this.paginatedItems = [];
    }
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.updatePaginatedProducts();
  }

  onItemsPerPageChange(itemsPerPage: number) {
    this.itemsPerPage = itemsPerPage;
    this.updatePaginatedProducts();
  }
  //#endregion

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rows']) {
      this.updatePaginatedProducts();
    }
  }

  ngOnInit(): void {
    this.updatePaginatedProducts();
  }
}
