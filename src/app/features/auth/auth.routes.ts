import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login-page/login-page.component').then((m) => m.LoginPageComponent),
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register-page/register-page.component').then((m) => m.RegisterPageComponent),
  },

  {
    path: 'forget-password',
    loadComponent: () =>
      import('./pages/forget-password-page/forget-password-page.component').then(
        (m) => m.ForgetPasswordPageComponent,
      ),
  },

  {
    path: 'verify-reset-code',
    loadComponent: () =>
      import('./pages/reset-code-page/reset-code-page.component').then(
        (m) => m.ResetCodePageComponent,
      ),
  },

  {
    path: 'reset-password',
    loadComponent: () =>
      import('./pages/reset-password-page/reset-password-page.component').then(
        (m) => m.ResetPasswordPageComponent,
      ),
  },
];
