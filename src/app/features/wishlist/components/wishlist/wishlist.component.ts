import { Component, inject, Input, OnInit } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent {
  @Input({ required: true }) product!: WishlistDetails;
  public readonly wishlistService = inject(WishlistService);

  deleteProduct(productId: string) {
    this.wishlistService.deleteWishlistProduct(productId);
    this.wishlistService.getWishlist();
  }
}
