import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
})
export class PaginatorComponent {
  @Input() totalItems: number = 0;
  @Output() pageChange = new EventEmitter<number>();
  @Output() itemsPerPageChange = new EventEmitter<number>();

  currentPage: number = 1;
  itemsPerPage: number = 5;
  pageSizes = [5, 10, 20];

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  setPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.pageChange.emit(this.currentPage);
  }

  setItemsPerPage(event: Event) {
    const element = event.target as HTMLSelectElement;
    this.itemsPerPage = parseInt(element.value, 10);
    this.itemsPerPageChange.emit(this.itemsPerPage);
    this.setPage(1);
  }
}
