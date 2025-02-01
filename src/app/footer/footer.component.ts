import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../product.interface';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  cartProducts: { [id: number]: number } = {};
  cartSubscription: Subscription | undefined;
  cartItems: Product[] | undefined;
  count:any = 0;

  constructor( private cartService: CartService ){}

  ngOnInit() {
    this.cartSubscription = this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      console.log(this.cartItems,'footer')
      this.count = this.cartItems.reduce((a,b)=>{
        return a+=b.quantity;
      },0)
    })
  }
}
