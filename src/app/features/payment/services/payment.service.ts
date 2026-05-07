import { inject, Injectable } from '@angular/core';
import { BaseHttpService } from '../../../core/services/utilities/base-http.service';
import { APP_APIS } from '../../../core/constants/app-apis';
import { HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { Router } from '@angular/router';
import { CartService } from '../../cart/services/cart.service';

@Injectable({
  providedIn: 'root',
})
export class PaymentService extends BaseHttpService {
  // inject
  private readonly router = inject(Router);
  private readonly cartService = inject(CartService);

  cashPayment(userDetails: {}, cartId: string) {
    this.http
      .post(`${APP_APIS.PAYMENT.cash}/${cartId}`, {
        shippingAddress: userDetails,
      })
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/allorders');
          this.cartService.numOfCartItems = 0;
        },
      });
  }

  onlinePayment(userDetails: {}, cartId: string) {
    const param = new HttpParams().append('url', environment.appUrl);

    this.http
      .post<IOnlinePaymentResponse>(
        `${APP_APIS.PAYMENT.online}/${cartId}`,
        {
          shippingAddress: userDetails,
        },
        {
          params: param,
        },
      )
      .subscribe({
        next: (response) => {
          window.location.assign(response.session.url);
        },
      });
  }
}
