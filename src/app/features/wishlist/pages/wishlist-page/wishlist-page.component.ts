import { WishlistService } from '../../services/wishlist.service';
import { Component, inject, Input, OnInit } from '@angular/core';
import { WishlistComponent } from '../../components/wishlist/wishlist.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-wishlist-page',
  imports: [WishlistComponent, LoadingSpinnerComponent],
  templateUrl: './wishlist-page.component.html',
  styleUrl: './wishlist-page.component.css',
})
export class WishlistPageComponent implements OnInit {
  // Injected
  public readonly wishlistService = inject(WishlistService);
  public readonly viewportScroller = inject(ViewportScroller);

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0], { behavior: 'smooth' });
    this.getWishlist();
  }

  getWishlist(): void {
    this.wishlistService.getWishlist();
  }
}
