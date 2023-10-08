import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { productModel } from 'src/app/Models/productModel';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-prod-save-update',
  templateUrl: './prod-save-update.component.html',
  styleUrls: ['./prod-save-update.component.scss'],
})
export class ProdSaveUpdateComponent {
  private readonly dialogRef = inject(MatDialogRef);
  public readonly dialogData = inject(MAT_DIALOG_DATA);
  products!: productModel;
  productService = inject(ProductService);
  itemForm!: FormGroup;
  categories: any[] = [];
  ngOnInit(): void {
    this.initItemForm();
    this.patchItemForm();
    this.productService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  initItemForm(): void {
    this.itemForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      categoryId: new FormControl(0, [Validators.min(1)]),
      imageUrl: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
  }

  patchItemForm(): void {
    if (this.dialogData) {
      this.itemForm.patchValue({
        id: this.dialogData.id,
        name: this.dialogData.name,
        imageUrl: this.dialogData.imageUrl,
        categoryId: this.dialogData.categoryId,
        description: this.dialogData.description,
      });
    }
  }

  onSaveOrUpdate(): void {
    if (!this.dialogData) {
      this.productService.addProd({ ...this.itemForm.value });
      this.dialogRef.close({ data: this.itemForm.value });
      return;
    }
    this.productService.editProd(this.dialogData.id, this.itemForm.value);
    this.dialogRef.close({ data: this.itemForm.value });
  }
}
