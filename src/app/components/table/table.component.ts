import { Component, Input, OnInit } from '@angular/core';
import { TableModel } from './models/table.interface';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from '../paginator/paginator.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, PaginatorComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  @Input() model: TableModel = {
    columns: [],
    rows: [],
    enablePaginator: true,
  };

  paginatedItems: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;

  get columns() {
    return this.model.columns;
  }

  get rows() {
    return this.paginatedItems;
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
    this.paginatedItems = this.model.rows.slice(startIndex, endIndex);
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

  ngOnInit(): void {
    this.updatePaginatedProducts();
  }
}
