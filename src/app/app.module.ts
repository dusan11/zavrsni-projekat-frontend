import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToastrModule } from 'ngx-toastr';

import { AuthGuard } from './auth.guard';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductsNewComponent } from './products-new/products-new.component';
import { ProductsEditComponent } from './products-edit/products-edit.component';
import { CompaniesComponent } from './companies/companies.component';
import { CompaniesEditComponent } from './companies-edit/companies-edit.component';
import { CompaniesNewComponent } from './companies-new/companies-new.component';
import { OrderStatusComponent } from './order-status/order-status.component';
import { OrderTypeComponent } from './order-type/order-type.component';
import { AccountComponent } from './account/account.component';
import { OrdersComponent } from './orders/orders.component';
import { OrdersEditComponent } from './orders-edit/orders-edit.component';
import { OrdersNewComponent } from './orders-new/orders-new.component';


const routes:Routes = [
  {
    path: '', component:HomeComponent,
    children: [
      {
        path:'proizvodi', component:ProductsComponent,
        children: [
          {
            path:'novi-proizvod', component:ProductsNewComponent
          },
          {
            path:'izmijeni-proizvod/:id', component:ProductsEditComponent
          }
        ],
      },
      {
        path:'kompanije', component:CompaniesComponent,
        children: [
          {
            path:'nova-kompanija', component:CompaniesNewComponent
          },
          {
            path:'izmijeni-kompaniju/:id', component:CompaniesEditComponent
          }
        ],
      },
      {
        path: 'status-narudzbe', component:OrderStatusComponent
      },
      {
        path: 'vrsta-narudzbe', component:OrderTypeComponent
      },
      {
        path: 'nalog', component:AccountComponent
      },
      {
        path:'narudzbe', component:OrdersComponent,
        children: [
          {
            path:'nova-narudzba', component:OrdersNewComponent
          },
          {
            path:'izmijeni-narudzbu/:id', component:OrdersEditComponent
          }
        ]
      }
    ],
    canActivate: [AuthGuard],
    
  },
  {
    path: 'login', component:LoginComponent
  },
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ProductsComponent,
    ProductsNewComponent,
    ProductsEditComponent,
    CompaniesComponent,
    CompaniesEditComponent,
    CompaniesNewComponent,
    OrderStatusComponent,
    OrderTypeComponent,
    AccountComponent,
    OrdersComponent,
    OrdersEditComponent,
    OrdersNewComponent
  ],
  imports: [
    BrowserModule,
    TooltipModule.forRoot(),
    ToastrModule.forRoot(),
    BsDatepickerModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
