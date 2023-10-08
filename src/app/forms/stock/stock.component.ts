import { Component, OnInit, inject } from '@angular/core';
import { stockModel } from 'src/app/Models/stockModel';
import { StockService } from 'src/app/Services/stock.service';
import { StockListComponent } from 'src/app/component/stock-list/stock-list.component';
export type stockState = {
  stocks: stockModel[];
};
@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
  providers: [StockListComponent],
})
export class StockComponent implements OnInit {
  stocks: stockModel[] = [];
  readonly stockService = inject(StockService);

  ngOnInit():any {
    this.stockService.fetchStocks().subscribe();
  }
}
