import { HomeProductsComponent } from '../../components/home-products/home-products.component';
import { CategoriesSliderComponent } from './../../components/categories-slider/categories-slider.component';
import { MainSliderComponent } from './../../components/main-slider/main-slider.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  imports: [MainSliderComponent, CategoriesSliderComponent, HomeProductsComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {}
