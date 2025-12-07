import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-products',
  imports: [],
  templateUrl: './card-products.component.html',
  styleUrl: './card-products.component.css',
})
export class CardProductsComponent {
  @Input({ required: true }) product!: allproducts;
}
