import { Component, Input } from '@angular/core';
import { TableModel } from './models/table.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input() model: TableModel = {
    columns: [],
    rows: [],
    enablePaginator: true,
  };

  get columns() {
    return this.model.columns;
  }

  get rows() {
    return this.model.rows;
  }

  getDate(date: String | Date | object): Date {
    if (date instanceof Date) {
      return date;
    }

    return new Date(date as string);
  }
}
