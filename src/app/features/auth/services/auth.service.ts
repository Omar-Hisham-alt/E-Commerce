import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { APP_APIS } from '../../../core/constants/app-apis';
import { STORED_KEYS } from './../../../core/constants/stored-keys';
import { BaseHttpService } from './../../../core/services/utilities/base-http.service';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseHttpService {
  // Injected
  private readonly router = inject(Router);

  login(userData: {}) {
    return this.http.post<IAuthResponse>(APP_APIS.AUTH.login, userData);
  }

  signup(userData: {}) {
    return this.http.post(APP_APIS.AUTH.signup, userData);
  }

  forgetPassword(userData: FormControl) {
    return this.http.post<IForgetPasswordResponse>(APP_APIS.AUTH.forgetPassword, userData);
  }

  logOut(): void {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  decodeToken(token: string): boolean | void {
    try {
      const userId = (jwtDecode(token) as { id: string })?.id;
      localStorage.setItem(STORED_KEYS.USER_ID, userId);
      return true;
    } catch {
      this.logOut();
    }
  }
}
