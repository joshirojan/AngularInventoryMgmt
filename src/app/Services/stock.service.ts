import { HttpClient } from '@angular/common/http';
import {
  Injectable,
  WritableSignal,
  computed,
  inject,
  signal,
} from '@angular/core';
import { stockModel } from '../Models/stockModel';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
export type stockState = {
  stocks: stockModel[];
};

@Injectable({
  providedIn: 'root',
})
export class StockService {
  private readonly httpClient = inject(HttpClient);
  stockUrl = 'Stock';
  productUrl = 'Product';
  searchUrl = 'Stock/search'
  private state: WritableSignal<stockState> = signal<stockState>({
    stocks: [],
  });
  stocks = computed(() => this.state().stocks);
  private readonly toastr = inject(ToastrService);


  searchStocks(keyword: string): void {
    this.httpClient
      .get<stockModel[]>(
        `${environment.apiUrl}/${this.searchUrl}?keyword=${keyword}`
      )
      .subscribe((response) => {
        if (response.length === 0) {
          this.toastr.error('', 'No matching stock found');
          return;
        }
        this.state.set({ stocks: [] });
        this.state.set({ stocks: response });
      });
  }


  getProducts(): Observable<any[]> {
    return this.httpClient.get<any[]>(
      `${environment.apiUrl}/${this.productUrl}`
    );
  }

  fetchStocks(): any {
    this.httpClient
      .get<stockModel[]>(`${environment.apiUrl}/${this.stockUrl}`)
      .subscribe((response) => {
        console.log(response);
        this.state.set({ stocks: response });
      });
  }

  addStock(stock: stockModel): void {
    this.httpClient
      .post<stockModel>(`${environment.apiUrl}/${this.stockUrl}`, stock)
      .subscribe({
        next: (value: stockModel) => {
          this.state.mutate((state) => state.stocks.push(value));
          this.toastr.success('', 'Add Stock Successful');
        },
        error: (error) => {
          this.toastr.error(error.error);
        },
      });
  }

  editStock(id: number, stock: stockModel): void {
    this.httpClient
      .put<stockModel>(`${environment.apiUrl}/${this.stockUrl}/${id}`, stock)
      .subscribe({
        next: (value: stockModel) => {
          this.state.mutate((state) => {
            const index = state.stocks.findIndex((s) => s.id === value.id);
            if (index !== -1) {
              state.stocks[index] = value;
            }
          });
          this.toastr.success('', 'Edit Stock Successful');
        },
        error: (error) => {
          if (error.status === 403) {
            this.toastr.error('', 'Access Denied');
          } else {
            this.toastr.error(error.error);
          }
        },
      });
  }

  deleteStock(id: number): void {
    this.httpClient
      .delete<stockModel>(`${environment.apiUrl}/${this.stockUrl}/${id}`)
      .subscribe({
        next: (value: stockModel) => {
          this.state.mutate((state) => {
            state.stocks = state.stocks.filter(
              (s) => s.id !== id
            );
          });
          this.toastr.success('', 'Delete Stock Successful');
        },
        error: (error) => {
          if (error.status === 403) {
            this.toastr.error('', 'Access Denied');
          } else {
            this.toastr.error(error.error);
          }
        },
      });
  }
}
