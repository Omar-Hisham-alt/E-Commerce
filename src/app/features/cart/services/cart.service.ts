import { Injectable } from '@angular/core';
import { APP_APIS } from '../../../core/constants/app-apis';
import { STORED_KEYS } from '../../../core/constants/stored-keys';
import { BaseHttpService } from '../../../core/services/utilities/base-http.service';

@Injectable({
  providedIn: 'root',
})
export class CartService extends BaseHttpService {
  userCart!: CartDetails;

  getCart() {
    this.http
      .get<ICartResponse>(APP_APIS.CART.data, {
        headers: {
          token: localStorage.getItem(STORED_KEYS.USER_TOKEN)!,
        },
      })
      .subscribe({
        next: (response) => {
          console.log(response);
          this.userCart = response.data;
        },
      });
  }
}
