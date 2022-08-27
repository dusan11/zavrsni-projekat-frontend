import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ToastrModule } from 'ngx-toastr';

import { AuthGuard } from './auth.guard';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductsNewComponent } from './products-new/products-new.component';


const routes:Routes = [
  {
    path: '', component:HomeComponent,
    children: [
      {
        path:'proizvodi', component:ProductsComponent,
        children: [
          {
            path:'novi', component:ProductsNewComponent
          }
        ],
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
    ProductsNewComponent
  ],
  imports: [
    BrowserModule,
    TooltipModule.forRoot(),
    ToastrModule.forRoot(),
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
