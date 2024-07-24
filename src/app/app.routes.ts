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
    loadChildren: () => [
      {
        path: '',
        loadComponent: () =>
          import(
            './pages/financial-products-page/financial-products-page.component'
          ).then((mod) => mod.FinancialProductsPageComponent),
      },
      {
        path: MY_ROUTES.CREATE,
        loadComponent: () =>
          import(
            './pages/create-financial-product-page/create-financial-product-page.component'
          ).then((mod) => mod.CreateFinancialProductPageComponent),
      },
    ],
  },
];
