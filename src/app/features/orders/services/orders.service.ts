import { isPlatformBrowser } from '@angular/common';
import { APP_APIS } from '../../../core/constants/app-apis';
import { BaseHttpService } from '../../../core/services/utilities/base-http.service';
import { STORED_KEYS } from './../../../core/constants/stored-keys';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrdersService extends BaseHttpService {
  // inject
  private readonly platformId = inject(PLATFORM_ID);

  // variables
  userOrders!: IAllOrdersResponse[];

  getUserOrders() {
    if (isPlatformBrowser(this.platformId)) {
      const userId = localStorage.getItem(STORED_KEYS.USER_ID);

      this.http.get<IAllOrdersResponse[]>(`${APP_APIS.ORDERS.orders}/${userId}`).subscribe({
        next: (response) => {
          console.log(response);
          this.userOrders = response.reverse();
        },
      });
    }
  }
}
