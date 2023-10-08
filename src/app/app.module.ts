import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { HomeComponent } from './forms/home/home.component';
import { LoginComponent } from './forms/login/login.component';
import { RegisterComponent } from './forms/register/register.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthenticationInterceptor } from './Services/interceptor';
import { ProductComponent } from './forms/product/product.component';
import { RouterModule } from '@angular/router';
import { ProductListComponent } from './component/product-list/product-list.component';
import { ProdSaveUpdateComponent } from './component/prod-save-update/prod-save-update.component';
import { MatDialogModule } from '@angular/material/dialog';
import { StockComponent } from './forms/stock/stock.component';
import { StockListComponent } from './component/stock-list/stock-list.component';
import { StockSaveUpdateComponent } from './component/stock-save-update/stock-save-update.component';
import { IssueProductComponent } from './forms/issue-product/issue-product.component';
import { IssueProductListComponent } from './component/issue-product-list/issue-product-list.component';
import { IssueProductSaveUpdateComponent } from './component/issue-product-save-update-component/issue-product-save-update-component.component';
import {MatTableModule} from "@angular/material/table"
import {MatPaginatorModule} from "@angular/material/paginator"
import {MatSortModule} from "@angular/material/sort";
import { ProductItemComponent } from './component/product-list/product-item/product-item.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProductComponent,
    ProductListComponent,
    ProdSaveUpdateComponent,
    StockComponent,
    StockListComponent,
    StockSaveUpdateComponent,
    IssueProductComponent,
    IssueProductListComponent,
    IssueProductSaveUpdateComponent,
    ProductItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
