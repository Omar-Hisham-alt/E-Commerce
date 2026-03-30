import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-cart-page',
  imports: [LoadingSpinnerComponent, RouterLink, CurrencyPipe],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
})
export class CartPageComponent implements OnInit {
  // Injected
  public readonly cartService = inject(CartService);
  public readonly viewportScroller = inject(ViewportScroller);

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0], { behavior: 'smooth' });
    this.getCart();
  }

  getCart(): void {
    this.cartService.getCart();
  }
}
