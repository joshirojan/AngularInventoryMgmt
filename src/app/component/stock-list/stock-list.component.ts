import { Component, Input, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { stockModel } from 'src/app/Models/stockModel';
import { StockService } from 'src/app/Services/stock.service';
import { StockSaveUpdateComponent } from '../stock-save-update/stock-save-update.component';
import Swal from 'sweetalert2';
import * as $ from 'jquery';
import 'datatables.net';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss'],
})
export class StockListComponent  {
  readonly stockService = inject(StockService);
  private readonly dialog = inject(MatDialog);
  @Input() stocks!: stockModel[];

  // displayColumns:string[]=["SN","Image","Product","Quantity","Date","Action"];

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
        this.deleteStock(id);
      }
    });
  }

  addNew(): void {
    const dialogRef = this.dialog.open(StockSaveUpdateComponent);
    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result?.data) {
    //     console.log(result.data);
    //   }
    // });
  }

  editStock(data: stockModel): void {
    const dialogRef = this.dialog.open(StockSaveUpdateComponent, {
      data, 
    });
    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result?.data) {
       
    //   }
    // });
  }

  deleteStock(id: number): void {
    this.stockService.deleteStock(id);
  }
}
