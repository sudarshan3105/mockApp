import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from '../cart/cart.service';
import { ProductDescComponent } from '../product-desc/product-desc.component';
import { Product } from '../product.interface';
import { spec } from 'node:test/reporters';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class ProductListComponent implements OnInit, OnDestroy {
  popular: Product[] = [
    { Id: 1, name: 'Product 1', description: 'Description 1', imageUrl: 'https://via.placeholder.com/150', price: 10, quantity: 0, showQuantityControl: false },
    { Id: 2, name: 'Product 2', description: 'Description 2', imageUrl: 'https://via.placeholder.com/150', price: 20, quantity: 0, showQuantityControl: false },
  ];

  special: Product[] = [
    { Id: 3, name: 'Special Product A', description: 'Special offer!', imageUrl: 'https://via.placeholder.com/150', price: 15, quantity: 0, showQuantityControl: false },
    { Id: 4, name: 'Bundle Deal C', description: 'Get more for less', imageUrl: 'https://via.placeholder.com/150', price: 25, quantity: 0, showQuantityControl: false },
  ];

  newArrival: Product[] = [
    { Id: 5, name: 'New Arrival X', description: 'Latest product', imageUrl: 'https://via.placeholder.com/150', price: 30, quantity: 0, showQuantityControl: false },
    { Id: 6, name: 'Fresh Stock Z', description: 'Just arrived', imageUrl: 'https://via.placeholder.com/150', price: 35, quantity: 0, showQuantityControl: false },
  ];

  searchTerm: string = '';
  cartProducts: { [id: number]: number } = {};
  private cartUpdatesSubscription: Subscription | undefined;
  cartSubscription: Subscription | undefined;
  cartItems: Product[] | undefined;

  get filteredPopular(): Product[] {
    const term = this.searchTerm.toLowerCase();
    return this.popular.filter(product =>
      product.name.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term)
    );
  }

  get filteredSpecial(): Product[] {
    const term = this.searchTerm.toLowerCase();
    return this.special.filter(product =>
      product.name.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term)
    );
  }

  get filteredNewArrival(): Product[] {
    const term = this.searchTerm.toLowerCase();
    return this.newArrival.filter(product =>
      product.name.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term)
    );
  }

  trackById(index: number, item: Product): number {
    return item.Id;
  }

  constructor(private cartService: CartService, public dialog: MatDialog) { }

  ngOnInit() {
    this.cartUpdatesSubscription = this.cartService.productListUpdates$.subscribe(updatedCartItems => {
      this.cartProducts = {};
      updatedCartItems.forEach(item => {
        this.cartProducts[item.Id] = item.quantity;
      });
    });
    this.cartSubscription = this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      let pro = [...this.popular,...this.special,...this.newArrival];
      pro.forEach((ele)=>{
        this.cartItems?.forEach((a)=>{
          if(ele.Id == a.Id){
            ele.quantity = a.quantity;
          }
        })
      })
    });
  }

  ngOnDestroy() {
    if (this.cartUpdatesSubscription) {
      this.cartUpdatesSubscription.unsubscribe();
    }
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  decrementQuantity(product: Product) {
    const currentQuantity = this.cartProducts[product.Id] || 0;
    if (currentQuantity > 0) {
      this.cartService.updateQuantity(product, currentQuantity - 1);
    }
  }

  openProductDetails(product: Product) {
    const dialogRef = this.dialog.open(ProductDescComponent, {
      data: product,
      panelClass: 'product-details-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'added') {
        this.addToCart(product);
      }
    });
  }
}