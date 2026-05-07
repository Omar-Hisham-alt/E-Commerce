import { STORED_KEYS } from './../../constants/stored-keys';
import { Component, inject, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth.service';
import { CartService } from '../../../features/cart/services/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  // injected
  private readonly authService = inject(AuthService);
  public readonly cartService = inject(CartService);

  // variables
  token!: string;

  @Input() isLogin = false;

  logOut() {
    this.authService.logOut();
  }

  ngOnInit(): void {
    this.token = localStorage.getItem(STORED_KEYS.USER_TOKEN) as string;
    if (this.token) {
      this.cartService.getCart();
    }
  }
}
