import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductMainComponent } from './components/productos/product-main/product-main.component';
import { ProductListComponent } from './components/productos/product-main/product-list/product-list.component';
import { ProductComponent } from './components/productos/product-main/product-list/product/product.component';
import { ProductDetailComponent } from './components/productos/product-main/product-detail/product-detail.component';
import { ProductEditComponent } from './components/productos/product-main/product-edit/product-edit.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NotFoundComponent,
    ProductMainComponent,
    ProductListComponent,
    ProductComponent,
    ProductDetailComponent,
    ProductEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
