import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { loggedGuard } from './core/guards/logged-guard';

export const routes: Routes = [
  // auth
  {
    path: '',
    canActivate: [loggedGuard],
    loadComponent: () =>
      import('./core/layout/auth-layout/auth-layout.component').then((m) => m.AuthLayoutComponent),
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },

  // user
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./core/layout/main-layout/main-layout.component').then((m) => m.MainLayoutComponent),
    children: [
      {
        path: '',
        loadChildren: () => import('./features/home/home.routes').then((m) => m.HOME_ROUTES),
      },

      {
        path: 'products',
        loadChildren: () =>
          import('./features/products/products.routes').then((m) => m.PRODUCTS_ROUTES),
      },

      {
        path: 'details/:id',
        loadComponent: () =>
          import('./features/products/pages/product-details/product-details.component').then(
            (m) => m.ProductDetailsComponent,
          ),
      },

      {
        path: 'details/:id/:slug',
        loadComponent: () =>
          import('./features/products/pages/product-details/product-details.component').then(
            (m) => m.ProductDetailsComponent,
          ),
      },

      {
        path: 'categories',
        loadChildren: () =>
          import('./features/categories/categories.routes').then((m) => m.Categories_Routes),
      },

      {
        path: 'brands',
        loadChildren: () => import('./features/brands/brands.routes').then((m) => m.BRANDS_ROUTES),
      },

      {
        path: 'cart',
        loadChildren: () => import('./features/cart/cart.routes').then((m) => m.CART_ROUTES),
      },

      {
        path: 'payment/:cartId',
        loadChildren: () =>
          import('./features/payment/payment.routes').then((m) => m.PAYMENT_ROUTES),
      },

      {
        path: 'allorders',
        loadChildren: () => import('./features/orders/orders.routes').then((m) => m.ORDERS_ROUTES),
      },

      {
        path: 'wishlist',
        loadChildren: () =>
          import('./features/wishlist/wishlist.routes').then((m) => m.WISHLIST_ROUTES),
      },
    ],
  },

  // not found
  {
    path: 'not-found',
    loadComponent: () =>
      import('./features/static-pages/not-found/not-found.component').then(
        (m) => m.NotFoundComponent,
      ),
  },

  {
    path: '**',
    redirectTo: 'not-found',
  },
];
