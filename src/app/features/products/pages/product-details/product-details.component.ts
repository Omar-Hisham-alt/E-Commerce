import { ViewportScroller } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { RelatedProductsComponent } from '../../components/related-products/related-products.component';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-details',
  imports: [LoadingSpinnerComponent, RelatedProductsComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  // Injected
  private readonly activatedRoute = inject(ActivatedRoute);
  public readonly productsService = inject(ProductsService);
  public readonly viewportScroller = inject(ViewportScroller);

  // Variables
  productId!: string;

  constructor() {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.productId = params.get('id')!;
        this.getProductById();
        this.viewportScroller.scrollToPosition([0, 0], { behavior: 'smooth' });
      },
    });
  }

  getProductById(): void {
    this.productsService.getProductById(this.productId);
  }
}
