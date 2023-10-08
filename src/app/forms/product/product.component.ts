import { Component, Injectable, OnInit, inject } from '@angular/core';
import { productModel } from 'src/app/Models/productModel';
import { ProductService } from 'src/app/Services/product.service';

export type productState = {
  products: productModel[];
};
@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
 
})
export class ProductComponent implements OnInit {
  products: productModel[] = [];
  readonly productService = inject(ProductService);

  ngOnInit(): void {
    this.productService.fetchProducts();
  }
}
