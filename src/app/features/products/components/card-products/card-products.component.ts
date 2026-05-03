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
  private readonly ngxSpinnerService = inject(NgxSpinnerService);

  @Input({ required: true }) product!: allproducts;

  isLoading: boolean = false;
  flag: boolean = false;
  flagIsLoading: boolean = false;

  addToCart(productId: string) {
    this.isLoading = true;

    // Loading Spinner
    this.ngxSpinnerService.show();

    // Calling API
    this.cartService.addToCart(productId).subscribe({
      next: (response) => {
        // Loading Spinner
        this.ngxSpinnerService.hide();

        // Response
        this.cartService.numOfCartItems = response.numOfCartItems;
        this.isLoading = false;

        // Toaster
        this.toastrService.success('Product Added Successfully!', undefined, {
          positionClass: 'toast-bottom-right',
        });
      },
      error: (error: HttpErrorResponse) => {
        // Loading Spinner
        this.ngxSpinnerService.hide();

        // Toaster
        this.toastrService.error('Failed to Add Product!', undefined, {
          positionClass: 'toast-bottom-right',
        });
      },
    });
  }

  addToWishlist(productId: string) {
    this.flagIsLoading = true;

    // Loading Spinner
    this.ngxSpinnerService.show();

    // Calling API
    this.wishlistService.addToWishlist(productId).subscribe({
      next: () => {
        // Loading Spinner
        this.ngxSpinnerService.hide();

        this.flagIsLoading = false;
        this.flag = true;

        // Toaster
        this.toastrService.success('Product Added Successfully!', undefined, {
          positionClass: 'toast-bottom-right',
        });
      },
      error: (error: HttpErrorResponse) => {
        // Loading Spinner
        this.ngxSpinnerService.hide();

        // Toaster
        this.toastrService.error('Failed to Add Product!', undefined, {
          positionClass: 'toast-bottom-right',
        });
      },
    });
  }
}
