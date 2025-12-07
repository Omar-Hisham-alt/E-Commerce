import { Injectable } from '@angular/core';
import { APP_APIS } from '../../../core/constants/app-apis';
import { BaseHttpService } from '../../../core/services/utilities/base-http.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends BaseHttpService {
  allProducts!: allproducts[];
  totalProducts!: number;

  getAllProducts(page = 1, limit = 8): void {
    this.http
      .get<IAllProductsResponse>(APP_APIS.PRODUCTS.allProducts + `?page=${page}&limit=${limit}`)
      .subscribe((response) => {
        this.allProducts = response.data;
        this.totalProducts = response.results;
      });
  }
}
