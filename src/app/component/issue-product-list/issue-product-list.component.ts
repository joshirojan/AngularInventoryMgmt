import { Component, Input, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { issueProductModel } from 'src/app/Models/issueProductModel';
import { IssueProductService } from 'src/app/Services/issue-product.service';
import { IssueProductSaveUpdateComponent } from '../issue-product-save-update-component/issue-product-save-update-component.component';
import Swal from 'sweetalert2';
import * as $ from 'jquery';
import 'datatables.net';

@Component({
  selector: 'app-issue-product-list',
  templateUrl: './issue-product-list.component.html',
  styleUrls: ['./issue-product-list.component.scss'],
})
export class IssueProductListComponent {
  readonly issueProductService = inject(IssueProductService);
  private readonly dialog = inject(MatDialog);
  @Input() issueProducts!: issueProductModel[];

  // ngOnInit(): void {
  //   this.initializeDataTable();
  // }

  private initializeDataTable() {
    $(() => {
      setTimeout(() => {
        $('#myTable').DataTable({
          pageLength: 5,
          lengthMenu: [5, 10, 25],
        });
      }, 1000);
    });
  }

  // ngOnDestroy() {
  //   $('#myTable').DataTable().destroy();
  // }

  onDeleteClick(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this item!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteIssueProduct(id);
      }
    });
  }

  addNew(): void {
    const dialogRef = this.dialog.open(IssueProductSaveUpdateComponent);
    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result?.data) {
    //     console.log(result.data);
    //   }
    // });
  }

  editIssueProduct(data: issueProductModel): void {
    const dialogRef = this.dialog.open(IssueProductSaveUpdateComponent, {
      data,
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result?.data) {
    //     this.initializeDataTable();
    //   }
    // });
  }

  deleteIssueProduct(id: number): void {
    this.issueProductService.deleteIssue(id);
  }
}
