import { STORED_KEYS } from './../../../core/constants/stored-keys';
import { APP_APIS } from '../../../core/constants/app-apis';
import { BaseHttpService } from '../../../core/services/utilities/base-http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService extends BaseHttpService {
  userCart!: CartDetails;
  numOfCartItems: number = 0;

  getCart() {
    this.http.get<IGetCartResponse>(APP_APIS.CART.data).subscribe({
      next: (response) => {
        console.log(response);
        this.userCart = response.data;
        this.numOfCartItems = response.numOfCartItems;
      },
    });
  }

  addToCart(productId: string) {
    return this.http.post<IAddToCartResponse>(APP_APIS.CART.data, { productId: productId });
  }

  updateCart(count: number, productId: string) {
    this.http
      .put<IUpdateCartResponse>(`${APP_APIS.CART.data}/${productId}`, {
        count: count,
      })
      .subscribe({
        next: (response) => {
          console.log(response);
          this.userCart = response.data;
        },
      });
  }

  deleteCartProduct(productId: string) {
    this.http.delete<IUpdateCartResponse>(`${APP_APIS.CART.data}/${productId}`).subscribe({
      next: (response) => {
        console.log(response);
        this.userCart = response.data;
      },
    });
  }

  clearCart() {
    this.http.delete(APP_APIS.CART.data).subscribe({
      next: (response) => {
        console.log(response);
        this.userCart.products = [];
      },
    });
  }
}
