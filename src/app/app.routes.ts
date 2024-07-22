import { Routes } from '@angular/router';
import { MY_ROUTES } from './constants/my-routes.constants';

export const routes: Routes = [
  {
    path: '',
    redirectTo: MY_ROUTES.FINANCIAL_PRODUCTS,
    pathMatch: 'full',
  },
  {
    path: MY_ROUTES.FINANCIAL_PRODUCTS,
    loadComponent: () =>
      import(
        './pages/financial-products-page/financial-products-page.component'
      ).then((mod) => mod.FinancialProductsPageComponent),
  },
];
