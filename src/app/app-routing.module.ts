import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductMainComponent } from './components/productos/product-main/product-main.component';
import { ProductListComponent } from './components/productos/product-main/product-list/product-list.component';
import { ProductDetailComponent } from './components/productos/product-main/product-detail/product-detail.component';
import { ProductEditComponent } from './components/productos/product-main/product-edit/product-edit.component';



const routes: Routes = [
    { path: 'home' , component: HomeComponent},
    { path: '' , redirectTo: '/home', pathMatch: 'full'},
    { path: 'monitoreo' , component: ProductMainComponent, 
    children: [
      {path:'', component: ProductListComponent}
    ]},
    { path: 'product' , component: ProductMainComponent, 
       children: [
         {path:'', component: ProductListComponent},
         {path:'new',component: ProductEditComponent },
         {path:':id',component: ProductDetailComponent},
         {path:'edit/:id',component: ProductEditComponent },
       ]},
  {path: '**' , component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
