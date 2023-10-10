import { Component, Input, OnInit, inject } from '@angular/core';
import { productModel } from 'src/app/Models/productModel';
import { ProductService } from 'src/app/Services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { ProdSaveUpdateComponent } from '../prod-save-update/prod-save-update.component';
// import * as $ from 'jquery';
// import 'datatables.net';
import { ActivatedRoute, Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [],
})
export class ProductListComponent implements OnInit {
  readonly productService = inject(ProductService);
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  @Input() products!: productModel[];
  itemForm!: FormGroup;
  token = '';
  role = '';
  isAdminToken: boolean = false;
  keyword: string = '';

  ngOnInit(): void {
    // this.initItemForm();
    this.token = localStorage.getItem('jwtToken') ?? '';
    if (this.token != null) {
      const decodedToken: any = jwtDecode(this.token);
      this.role = decodedToken
        ? decodedToken[
            'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
          ]
        : null;
      this.isAdminToken = this.role === 'Admin';
    }
  }

  // initItemForm(): void {
  //   this.itemForm = new FormGroup({
  //     keyword: new FormControl(''),
  //   });
  // }

  onSearchClick(): void {
    this.productService.searchProducts(this.keyword);
  }
  // ngOnInit(): void {
  //   setTimeout(() => {
  //     this.initializeDataTable();
  //   }, 3000);
  // }
  // private initializeDataTable() {
  //   $(() => {
  //     $('#myTable').DataTable({
  //       pageLength: 5,
  //       lengthMenu: [5, 10, 25],
  //     });
  //   });
  // }
  // ngOnDestroy() {
  //   $('#myTable').DataTable().destroy();
  // }

  addNew(): void {
    const dialogRef = this.dialog.open(ProdSaveUpdateComponent);
    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result?.data) {
    //     console.log(result.data);
    //   }
    // });
  }

  editProd(data: productModel): void {
    const dialogRef = this.dialog.open(ProdSaveUpdateComponent, {
      data,
    });
    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result?.data) {

    //   }
    // });
  }

  goToItemDetails(data: productModel): void {
    // this.router.navigateByUrl(`/sports/card-item/${data.id}`, {state: {data}});
    this.router
      .navigate(['product-item', data.id], {
        state: { data },
        relativeTo: this.route,
      })
      .then();
  }
}
