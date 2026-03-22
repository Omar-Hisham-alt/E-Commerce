import { STORED_KEYS } from './../../../core/constants/stored-keys';
import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../../core/services/utilities/base-http.service';
import { APP_APIS } from '../../../core/constants/app-apis';

@Injectable({
  providedIn: 'root',
})
export class wishlistService extends BaseHttpService {
  userWishlist!: WishlistDetails[];

  getWishlist() {
    this.http
      .get<IWishlistResponse>(APP_APIS.WISHLIST.data, {
        headers: {
          token: localStorage.getItem(STORED_KEYS.USER_TOKEN)!,
        },
      })
      .subscribe({
        next: (response) => {
          console.log(response);
          this.userWishlist = response.data;
        },
      });
  }
}
