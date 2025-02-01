import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Product } from '../product.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<Product[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  private productListUpdatesSubject = new Subject<Product[]>();
  productListUpdates$ = this.productListUpdatesSubject.asObservable();

  addToCart(product: Product) {
    const currentItems = this.cartItemsSubject.getValue();
    const existingProduct = currentItems.find(item => item.Id === product.Id);

    let updatedItems;

    if (existingProduct) {
      updatedItems = currentItems.map(item =>
        item.Id === product.Id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedItems = [...currentItems, { ...product, quantity: 1 }];
    }

    this.cartItemsSubject.next(updatedItems);
    this.productListUpdatesSubject.next(updatedItems);
  }

  removeFromCart(product: Product) {
    const currentItems = this.cartItemsSubject.getValue();
    const updatedItems = currentItems.filter(item => item.Id !== product.Id);
    this.cartItemsSubject.next(updatedItems);
    this.productListUpdatesSubject.next(updatedItems);
  }

  updateQuantity(product: Product, quantity: number) {
    const currentItems = this.cartItemsSubject.getValue();
    const updatedItems = currentItems.map(item =>
      item.Id === product.Id ? { ...item, quantity } : item
    );
    this.cartItemsSubject.next(updatedItems);
    this.productListUpdatesSubject.next(updatedItems);
  }
}