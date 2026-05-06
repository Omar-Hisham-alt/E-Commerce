import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../cart/services/cart.service';
import { WishlistService } from '../../../wishlist/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-card-products',
  imports: [RouterLink],
  templateUrl: './card-products.component.html',
  styleUrl: './card-products.component.css',
})
export class CardProductsComponent {
  // injected
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly toastrService = inject(ToastrService);

  @Input({ required: true }) product!: allproducts;

  isLoading: boolean = false;
  flag: boolean = false;
  flagIsLoading: boolean = false;

  addToCart(productId: string) {
    this.isLoading = true;

    // Calling API
    this.cartService.addToCart(productId).subscribe({
      next: (response) => {
        // Response
        this.cartService.numOfCartItems = response.numOfCartItems;
        this.isLoading = false;

        // Toaster
        this.toastrService.success('Product Added Successfully!', undefined, {
          positionClass: 'toast-bottom-right',
        });
      },
      error: (error: HttpErrorResponse) => {
        // Toaster
        this.toastrService.error('Failed to Add Product!', undefined, {
          positionClass: 'toast-bottom-right',
        });
      },
    });
  }

  addToWishlist(productId: string) {
    this.flagIsLoading = true;

    // Calling API
    this.wishlistService.addToWishlist(productId).subscribe({
      next: () => {
        this.flagIsLoading = false;
        this.flag = true;

        // Toaster
        this.toastrService.success('Product Added Successfully!', undefined, {
          positionClass: 'toast-bottom-right',
        });
      },
      error: (error: HttpErrorResponse) => {
        // Toaster
        this.toastrService.error('Failed to Add Product!', undefined, {
          positionClass: 'toast-bottom-right',
        });
      },
    });
  }
}
