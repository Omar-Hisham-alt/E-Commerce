import { Component, inject } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-orders-page',
  imports: [DatePipe],
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.css',
})
export class OrdersPageComponent {
  // inject
  public readonly ordersService = inject(OrdersService);

  ngOnInit(): void {
    this.getUserOrders();
  }

  getUserOrders(): void {
    this.ordersService.getUserOrders();
  }
}
