import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { issueProductModel } from 'src/app/Models/issueProductModel';
import { IssueProductService } from 'src/app/Services/issue-product.service';
import { StockService } from 'src/app/Services/stock.service';

@Component({
  selector: 'app-issue-product-save-update-component',
  templateUrl: './issue-product-save-update-component.component.html',
  styleUrls: ['./issue-product-save-update-component.component.scss'],
})
export class IssueProductSaveUpdateComponent implements OnInit {
  private readonly dialogRef = inject(MatDialogRef);
  public readonly dialogData = inject(MAT_DIALOG_DATA);
  issueProducts!: issueProductModel;
  issueProductService = inject(IssueProductService);
  stockService = inject(StockService);
  itemForm!: FormGroup;
  users: any[] = [];
  products: any[] = [];
  ngOnInit(): void {
    this.initItemForm();
    this.patchItemForm();
    this.issueProductService.getUsers().subscribe((data) => {
      this.users = data;
    });
    this.stockService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  initItemForm(): void {
    this.itemForm = new FormGroup({
      userId: new FormControl(0, [Validators.min(1)]),
      productId: new FormControl(0, [Validators.min(1)]),
      quantity: new FormControl(0, [Validators.required, Validators.min(1)]),
    });
  }

  patchItemForm(): void {
    if (this.dialogData) {
      this.itemForm.patchValue({
        id: this.dialogData.id,
        userId: this.dialogData.userId,
        productId: this.dialogData.productId,
        quantity: this.dialogData.quantity,
      });
    }
  }

  onSaveOrUpdate(): void {
    if (!this.dialogData) {
      this.issueProductService.addIssueProduct({ ...this.itemForm.value });
      this.dialogRef.close({ data: this.itemForm.value });
      return;
    }
    this.issueProductService.editIssueProduct(
      this.dialogData.id,
      this.itemForm.value
    );
    this.dialogRef.close({ data: this.itemForm.value });
  }
}
