import { wishlistService } from './../../services/wishlist.service';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit {
  // Injected
  public readonly wishlistService = inject(wishlistService);

  ngOnInit(): void {
    this.getWishlist();
  }

  getWishlist(): void {
    this.wishlistService.getWishlist();
  }
}
