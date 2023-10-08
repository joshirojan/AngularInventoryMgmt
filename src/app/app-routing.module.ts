import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './forms/register/register.component';
import { HomeComponent } from './forms/home/home.component';
import { LoginComponent } from './forms/login/login.component';
import { authGuardGuard } from './Guard/auth-guard.guard';
import { loginGuardGuard } from './Guard/login-guard.guard';
import { ProductComponent } from './forms/product/product.component';
import { StockComponent } from './forms/stock/stock.component';
import { IssueProductComponent } from './forms/issue-product/issue-product.component';
import { ProductItemComponent } from './component/product-list/product-item/product-item.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', canActivate: [authGuardGuard], component: HomeComponent },
  {
    path: 'register',
    canActivate: [loginGuardGuard],
    component: RegisterComponent,
  },
  { path: 'login', canActivate: [loginGuardGuard], component: LoginComponent },
  {
    path: 'product',
    canActivate: [authGuardGuard],
    component: ProductComponent,
  },
  {
    path: 'stock',
    canActivate: [authGuardGuard],
    component: StockComponent,
  },
  {
    path: 'issueProduct',
    canActivate: [authGuardGuard],
    component: IssueProductComponent,
  },
  { path: 'product/product-item/:id', component: ProductItemComponent },
  // { path: 'product', loadComponent: () => import('./forms/product/product.component')
  // .then(m => m.ProductComponent) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
