import {
  Injectable,
  WritableSignal,
  computed,
  inject,
  signal,
} from '@angular/core';
import { issueProductModel } from '../Models/issueProductModel';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
export type issueProductState = {
  issueProducts: issueProductModel[];
};

@Injectable({
  providedIn: 'root',
})
export class IssueProductService {
  private readonly httpClient = inject(HttpClient);
  issueProductUrl = 'IssueProduct';
  userUrl = 'User';
  private state: WritableSignal<issueProductState> = signal<issueProductState>({
    issueProducts: [],
  });
  issueProducts = computed(() => this.state().issueProducts);
  private readonly toastr = inject(ToastrService);

  getUsers(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${environment.apiUrl}/${this.userUrl}`);
  }

  fetchIssueProduct(): void {
    this.httpClient
      .get<issueProductModel[]>(`${environment.apiUrl}/${this.issueProductUrl}`)
      .subscribe((response) => {
        console.log(response);
        this.state.set({ issueProducts: response });
      });
  }

  addIssueProduct(issueProducts: issueProductModel): void {
    this.httpClient
      .post<issueProductModel>(
        `${environment.apiUrl}/${this.issueProductUrl}`,
        issueProducts
      )
      .subscribe({
        next: (value: issueProductModel) => {
          console.log(value);
          this.state.mutate((state) => state.issueProducts.push(value));
          this.toastr.success('', 'Issue Product Successful');
        },
        error: (error) => {
          this.toastr.error(error.error);
        },
      });
  }

  editIssueProduct(id: number, issueProducts: issueProductModel): void {
    this.httpClient
      .put<issueProductModel>(
        `${environment.apiUrl}/${this.issueProductUrl}/${id}`,
        issueProducts
      )
      .subscribe({
        next: (value: issueProductModel) => {
          this.state.mutate((state) => {
            const index = state.issueProducts.findIndex(
              (s) => s.id === value.id
            );
            if (index !== -1) {
              state.issueProducts[index] = value;
            }
          });
          this.toastr.success('', 'Edit Issue Product Successful');
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

  deleteIssue(id: number): void {
    this.httpClient
      .delete<issueProductModel>(
        `${environment.apiUrl}/${this.issueProductUrl}/${id}`
      )
      .subscribe({
        next: (value: issueProductModel) => {
          this.state.mutate((state) => {
            state.issueProducts = state.issueProducts.filter(
              (s) => s.id !== id
            );
          });
          this.toastr.success('', 'Delete Issue Product Successful');
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
