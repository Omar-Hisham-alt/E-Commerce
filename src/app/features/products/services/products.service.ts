import { response } from 'express';
import { APP_APIS } from './../../../core/constants/app-apis';
import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../../core/services/utilities/base-http.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends BaseHttpService {
  allProducts!: allproducts[];
  productDetails!: Data;
  totalProducts!: number;

  getAllProducts(page = 1, limit = 8): void {
    this.http
      .get<IAllProductsResponse>(APP_APIS.PRODUCTS.allProducts + `?page=${page}&limit=${limit}`)
      .subscribe((response) => {
        this.allProducts = response.data;
        this.totalProducts = response.results;
      });
  }

  getProductById(productId: string) {
    return this.http
      .get<IProductDetailsResponse>(APP_APIS.PRODUCTS.allProducts + `/${productId}`)
      .subscribe({
        next: (response) => {
          this.productDetails = response.data;
        },
      });
  }
}
