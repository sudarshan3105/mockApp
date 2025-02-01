import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductDescComponent } from './product-desc/product-desc.component';
import { CartComponent } from './cart/cart.component';
import { CartService } from './cart/cart.service';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductDescComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    FormsModule,
    CommonModule,
    MatDialogModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    CartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
