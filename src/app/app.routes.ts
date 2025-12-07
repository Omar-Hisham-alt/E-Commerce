import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';
import { AUTH_ROUTES } from './features/auth/auth.routes';
import { BRANDS_ROUTES } from './features/brands/brands.routes';
import { Categories_Routes } from './features/categories/categories.routes';
import { HOME_ROUTES } from './features/home/home.routes';
import { PRODUCTS_ROUTES } from './features/products/products.routes';

export const routes: Routes = [
  // auth
  {
    path: '',
    component: AuthLayoutComponent,
    children: AUTH_ROUTES,
  },

  // user
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        children: HOME_ROUTES,
      },

      {
        path: 'products',
        children: PRODUCTS_ROUTES,
      },

      {
        path: 'categories',
        children: Categories_Routes,
      },

      {
        path: 'brands',
        children: BRANDS_ROUTES,
      },
    ],
  },

  // not found
  {
    path: 'not-found',
    loadComponent: () =>
      import('./features/static-pages/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },

  {
    path: '**',
    redirectTo: 'not-found',
  },
];
