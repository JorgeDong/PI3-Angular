import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../../../../services/products.service';
import { Product } from '../../../../models/product';
import { ActivatedRoute,Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass']
})
export class ProductListComponent implements OnInit {

  // Arreglo inicial de productos
  productos: Product[];
  productosBusqueda: Product[] = [];
  modo: String;
  busqueda = '';

  idMonitorear = [];

  productosMonitoreados: Product[];
  

  productsSubscription = new Subscription();

  //Enfoque
  private subscript: Subscription;

  constructor(private productsService: ProductsService, private router: Router) {
    //this.productos = productsService.productos;
    this.productosBusqueda = productsService.productos;

    this.productosMonitoreados = productsService.productosMonitoreados;

  }

  ngOnInit(): void {
    this.subscript = this.productsService.cambiaDato.subscribe(
      (Productos: Product[]) => {
        this.productos = Productos;
      }
    );
    this.modo = this.router.url;
  }

  buscar(){
    //this.nuevoArreglo  = this.productos.filter( e =>  e.toUpperCase().includes(bus.toUpperCase()))
    // console.log(this.busqueda);
    // console.log(this.productos.filter(e =>  e.toUpperCase().includes(this.busqueda.toUpperCase())))
    // this.productos.filter(e => {
    //   e.nombre
    // });
    

    console.log('Buscando..' + this.busqueda);
    let bus = String(this.busqueda);
    bus = bus.toLocaleUpperCase();

    this.productosBusqueda = [];
    this.productsService.productosBusqueda = [];

    // this.productos.forEach((element) => {
    //   let bnombre = String(element.nombre);
    //   bnombre = bnombre.toLocaleUpperCase();
    //   let bdescripcion = String(element.descripcion);
    //   bdescripcion = bdescripcion.toLocaleUpperCase();

    //   if( bnombre.includes(bus) || bdescripcion.includes(bus) ){
    //     console.log(element);
    //       this.productosBusqueda.push(element);
    //   }
    // }, this);

    if(this.busqueda == ''){
      this.productosBusqueda = this.productsService.productos;
      this.productosMonitoreados = this.productsService.productosMonitoreados;
    }else{
      this.productosBusqueda = this.productsService.busqueda(bus,this.modo);
      if(this.modo == '/monitoreo'){
        this.productosMonitoreados = this.productosBusqueda;
      }
     
    }


  }

  // Ejemplo eliminar
  del(){
    this.productsService.productsSubject.subscribe((data)=>{
        console.log(data);
        //this.userList = data;
    });
  }



  // deleteProduct(id: number){
  //   this.productsService.deleteProductById(id);
  //   this.productos = this.productsService.productos;
  //   this.productosBusqueda = this.productsService.productos;
  // }

  actualizarContador(mensaje) {
    console.log('contador hijo=' + mensaje);
    if(this.modo  == '/monitoreo'){
      this.productsService.deleteProductMonitoreadoById(mensaje);
      this.productosMonitoreados = this.productsService.getproductosMonitoreados();

      // let arrAux: Product[] = [];
      // this.productosMonitoreados.forEach(element =>{
      //   if(element.uid != mensaje) {
      //     arrAux.push(element);
      //   }
      //   });
      // this.productosMonitoreados = arrAux;
    }else{
      this.productsService.deleteProductById(mensaje);
      this.productos = this.productsService.productos;
      this.productosBusqueda = this.productsService.productos;

      this.productsService.deleteProductMonitoreadoById(mensaje);
      this.productosMonitoreados = this.productsService.getproductosMonitoreados();
    }
  }


  enviarMonitoreo(mensaje){
    console.log(mensaje);
    this.idMonitorear.push(mensaje);
    console.log('Arreglo');
    console.log(this.idMonitorear);

  }


  monitorear(){
    console.log(this.idMonitorear);
    this.productsService.agregarProductosMonitoreo(this.idMonitorear);
    this.productosMonitoreados = this.productsService.productosMonitoreados;
    console.log(this.productsService.productosMonitoreados);
    
  }




}
