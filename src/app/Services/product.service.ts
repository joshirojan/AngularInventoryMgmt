import { HttpClient } from '@angular/common/http';
import {
  inject,
  WritableSignal,
  signal,
  Injectable,
  computed,
} from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { productModel } from '../Models/productModel';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
export type productState = {
  products: productModel[];
};

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly httpClient = inject(HttpClient);
  productUrl = 'Product';
  categoryUrl = 'Category';
  private state: WritableSignal<productState> = signal<productState>({
    products: [],
  });
  products = computed(() => this.state().products);
  private readonly toastr = inject(ToastrService);

  fetchProducts(): void {
    this.httpClient
      .get<productModel[]>(`${environment.apiUrl}/${this.productUrl}`)
      .subscribe((response) => {
        this.state.set({ products: response });
      });
  }

  addProd(prod: productModel): void {
    this.httpClient
      .post<productModel>(`${environment.apiUrl}/${this.productUrl}`, prod)
      .subscribe({
        next: (value: productModel) => {
          this.state.mutate((state) => state.products.push(value));
          this.toastr.success('', 'Add Product Successful');
        },
        error: (error) => {
          this.toastr.error(error.error);
        },
      });
  }

  getCategories(): Observable<any[]> {
    return this.httpClient.get<any[]>(
      `${environment.apiUrl}/${this.categoryUrl}`
    );
  }

  editProd(id: number, prod: productModel): void {
    this.httpClient
      .put<productModel>(`${environment.apiUrl}/${this.productUrl}/${id}`, prod)
      .subscribe({
        next: (value: productModel) => {
          this.state.mutate((state) => {
            const index = state.products.findIndex((s) => s.id === value.id);
            if (index !== -1) {
              state.products[index] = value;
            }
          });
          this.toastr.success('', 'Edit Product Successful');
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
