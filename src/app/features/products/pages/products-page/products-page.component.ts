import { ViewportScroller } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { CardProductsComponent } from '../../components/card-products/card-products.component';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products-page',
  imports: [
    CardProductsComponent,
    SectionHeaderComponent,
    LoadingSpinnerComponent,
    NgxPaginationModule,
  ],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css',
})
export class ProductsPageComponent implements OnInit {
  public readonly productsService = inject(ProductsService);
  // include all the navigation control
  public readonly router = inject(Router);
  public readonly viewportScroller = inject(ViewportScroller);
  public readonly activatedRoute = inject(ActivatedRoute);

  page = 1;
  limit = 8;

  constructor() {
    const page = +this.activatedRoute.snapshot.queryParamMap.get('page')!;
    this.page = page ? page : 1;
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.productsService.getAllProducts(this.page, this.limit);
  }

  pageChanged($event: number): void {
    this.page = $event;
    this.getAllProducts();

    this.router.navigate([], {
      queryParams: {
        page: this.page,
      },
    });

    // this way have problem with SSR
    // window.scrollTo({
    //   top: 0,
    //   behavior: 'smooth',
    // });

    this.viewportScroller.scrollToPosition([0, 0], { behavior: 'smooth' });
  }
}
