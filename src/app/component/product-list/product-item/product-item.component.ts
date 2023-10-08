import { Component, OnInit } from '@angular/core';
import { productModel } from 'src/app/Models/productModel';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  data!: productModel;
  ngOnInit(): void {
    this.data = history.state?.data;
  }
}
