export interface TableConfig {
  enablePaginator?: boolean;
  enableActions?: boolean;
}

export interface Column {
  title: string;
  property: string;
  columnType?: 'text' | 'img' | 'date';
  description?: string;
  enableIcon?: boolean;
}
