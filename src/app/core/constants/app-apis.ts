import { environment } from '../../../environments/environment.development';

export const APP_APIS = {
  PRODUCTS: {
    allProducts: `${environment.baseUrl}products`,
  },

  CATEGORIES: {
    allCategories: `${environment.baseUrl}categories`,
  },

  BRANDS: {
    allBrands: `${environment.baseUrl}brands`,
  },
};
