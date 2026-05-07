import { STORED_KEYS } from './../constants/stored-keys';
import { inject, PLATFORM_ID } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  if (
    !req.urlWithParams.includes('cart') &&
    !req.urlWithParams.includes('wishlist') &&
    !req.urlWithParams.includes('orders')
  ) {
    return next(req);
  }

  const platformId = inject(PLATFORM_ID);
  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem(STORED_KEYS.USER_TOKEN);

    if (token) {
      req = req.clone({
        setHeaders: {
          token: token,
        },
      });
    }
  }

  return next(req);
};
