import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Column, TableConfig } from './models/table.interface';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from '../paginator/paginator.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, PaginatorComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit, OnChanges {
  @Input() config: TableConfig = {
    enablePaginator: true,
  };
  @Input() columns: Column[] = [];
  @Input() rows: any[] = [];
  @Input() isLoading: boolean = false;

  paginatedItems: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;

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
