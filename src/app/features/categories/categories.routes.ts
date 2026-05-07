import { Routes } from '@angular/router';

export const Categories_Routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/categories-page/categories-page.component').then(
        (m) => m.CategoriesPageComponent,
      ),
  },
];
