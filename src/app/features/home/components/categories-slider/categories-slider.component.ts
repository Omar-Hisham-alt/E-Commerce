import { OwlOptions } from './../../../../../../node_modules/ngx-owl-carousel-o/lib/models/owl-options.model.d';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CategoriesService } from './../../../categories/services/categories.service';
import { Component, inject, OnInit } from '@angular/core';
import { getOwlOptions } from '../../../../core/services/utilities/owl-options.service';

@Component({
  selector: 'app-categories-slider',
  imports: [CarouselModule],
  templateUrl: './categories-slider.component.html',
  styleUrl: './categories-slider.component.css',
})
export class CategoriesSliderComponent implements OnInit {
  public readonly categoriesService = inject(CategoriesService);

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.categoriesService.getAllCategories();
  }

  customOptions: OwlOptions = getOwlOptions(
    {
      responsive: {
        0: {
          items: 2,
        },
        400: {
          items: 3,
        },
        740: {
          items: 6,
        },
        940: {
          items: 8,
        },
      },
    },
    { autoplay: true }
  );
}
