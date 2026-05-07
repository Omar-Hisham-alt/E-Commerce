import { ORDERS_ROUTES } from './features/orders/orders.routes';
import { PAYMENT_ROUTES } from './features/payment/payment.routes';
import { authGuard } from './core/guards/auth-guard';
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';
import { AUTH_ROUTES } from './features/auth/auth.routes';
import { BRANDS_ROUTES } from './features/brands/brands.routes';
import { Categories_Routes } from './features/categories/categories.routes';
import { HOME_ROUTES } from './features/home/home.routes';
import { PRODUCTS_ROUTES } from './features/products/products.routes';
import { loggedGuard } from './core/guards/logged-guard';
import { ProductDetailsComponent } from './features/products/pages/product-details/product-details.component';
import { CART_ROUTES } from './features/cart/cart.routes';
import { WISHLIST_ROUTES } from './features/wishlist/wishlist.routes';

export const routes: Routes = [
  // auth
  {
    path: '',
    canActivate: [loggedGuard],
    component: AuthLayoutComponent,
    children: AUTH_ROUTES,
  },

  // user
  {
    path: '',
    canActivate: [authGuard],
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
        path: 'details/:id',
        component: ProductDetailsComponent,
      },

      {
        path: 'details/:id/:slug',
        component: ProductDetailsComponent,
      },

      {
        path: 'categories',
        children: Categories_Routes,
      },

      {
        path: 'brands',
        children: BRANDS_ROUTES,
      },

      {
        path: 'cart',
        children: CART_ROUTES,
      },

      {
        path: 'payment/:cartId',
        children: PAYMENT_ROUTES,
      },

      {
        path: 'allorders',
        children: ORDERS_ROUTES,
      },

      {
        path: 'wishlist',
        children: WISHLIST_ROUTES,
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
