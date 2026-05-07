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
    verifyToken: `${environment.baseUrl}auth/verifyToken`,
    forgetPassword: `${environment.baseUrl}auth/forgotPasswords`,
    verifyResetCode: `${environment.baseUrl}auth/verifyResetCode`,
    resetPassword: `${environment.baseUrl}auth/resetPassword`,
  },

  CART: {
    data: `${environment.baseUrl}cart`,
  },

  WISHLIST: {
    data: `${environment.baseUrl}wishlist`,
  },

  PAYMENT: {
    online: `${environment.baseUrl}orders/checkout-session`,
    cash: `${environment.baseUrl}orders`,
  },

  ORDERS: {
    orders: `${environment.baseUrl}orders/user`,
  },
};
