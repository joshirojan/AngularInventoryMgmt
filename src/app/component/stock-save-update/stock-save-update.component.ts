import { ReturnStatement } from '@angular/compiler';
import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { productModel } from 'src/app/Models/productModel';
import { stockModel } from 'src/app/Models/stockModel';
import { ProductService } from 'src/app/Services/product.service';
import { StockService } from 'src/app/Services/stock.service';

@Component({
  selector: 'app-stock-save-update',
  templateUrl: './stock-save-update.component.html',
  styleUrls: ['./stock-save-update.component.scss'],
})
export class StockSaveUpdateComponent {
  private readonly dialogRef = inject(MatDialogRef);
  public readonly dialogData = inject(MAT_DIALOG_DATA);
  stocks!: stockModel;
  stockService = inject(StockService);
  productService = inject(ProductService);
  itemForm!: FormGroup;
  products: productModel[] = [];
  ngOnInit(): void {
    this.initItemForm();
    this.patchItemForm();
    this.stockService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  initItemForm(): void {
    this.itemForm = new FormGroup({
      productId: new FormControl(0, Validators.min(1)),
      quantity: new FormControl(0, [Validators.min(1),Validators.required]),
    });
  }
  
  get productId():FormControl{
    return this.itemForm.get('productId') as FormControl
  }

  get quantity():FormControl{
    return this.itemForm.get('quantity') as FormControl
  }

  patchItemForm(): void {
    if (this.dialogData) {
      this.itemForm.patchValue({
        id: this.dialogData.id,
        productId: this.dialogData.productId,
        quantity: this.dialogData.quantity,
      });
    }
  }

  onSaveOrUpdate(): void {
    if (!this.dialogData) {
      this.stockService.addStock({ ...this.itemForm.value });
      this.dialogRef.close({ data: this.itemForm.value });
      return;
    }
    this.stockService.editStock(this.dialogData.id, this.itemForm.value);
    this.dialogRef.close({ data: this.itemForm.value });
  }
}
