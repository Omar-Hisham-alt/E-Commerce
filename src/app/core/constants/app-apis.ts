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

  AUTH: {
    signup: `${environment.baseUrl}auth/signup`,
    login: `${environment.baseUrl}auth/signin`,
    forgetPassword: `${environment.baseUrl}auth/forgotPasswords`,
    verifyToken: `${environment.baseUrl}auth/verifyToken`,
  },

  CART: {
    data: `${environment.baseUrl}cart`,
  },
};
