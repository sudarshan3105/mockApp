import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../product.interface';
import { Subscription } from 'rxjs';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: Product[] = [];
  private cartSubscription: Subscription | undefined;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartSubscription = this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product);
  }

  updateQuantity(product: Product, quantity: number) {
    this.cartService.updateQuantity(product, quantity);
  }

  calculateTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  buyNow() {
    console.log(JSON.stringify(this.cartItems, null, 2));
  }
}