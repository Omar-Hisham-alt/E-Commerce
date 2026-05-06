import { Injectable } from '@angular/core';
import { APP_APIS } from '../../../core/constants/app-apis';
import { BaseHttpService } from '../../../core/services/utilities/base-http.service';

@Injectable({
  providedIn: 'root',
})
export class WishlistService extends BaseHttpService {
  userWishlist!: WishlistDetails[];

  getWishlist() {
    this.http.get<IGetWishlistResponse>(APP_APIS.WISHLIST.data).subscribe({
      next: (response) => {
        console.log(response);
        this.userWishlist = response.data;
      },
    });
  }

  addToWishlist(productId: string) {
    return this.http.post<IAddToWishlistResponse>(APP_APIS.WISHLIST.data, { productId: productId });
  }

  deleteWishlistProduct(productId: string) {
    this.http.delete<IDeleteWishlistResponse>(`${APP_APIS.WISHLIST.data}/${productId}`).subscribe({
      next: (response) => {
        this.userWishlist = response.data;
      },
    });
  }
}
