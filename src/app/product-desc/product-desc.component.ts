import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../product.interface';

@Component({
  selector: 'app-product-desc',
  templateUrl: './product-desc.component.html',
  styleUrl: './product-desc.component.css'
})
export class ProductDescComponent {
  constructor(
    public dialogRef: MatDialogRef<ProductDescComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {}

  ngOnInit(){
    console.log(this.data);
  }

  closeMenu(){
    this.dialogRef.close();
  }
}
