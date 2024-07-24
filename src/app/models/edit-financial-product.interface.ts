import { FinancialProduct } from './financial-product.interface';

export interface EditFinancialProduct extends Omit<FinancialProduct, 'id'> {}
