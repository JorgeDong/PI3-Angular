import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Especificacion } from '../models/especificacion';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
	//Enfoque 
	cambiaDato = new Subject<Product[]>();


	productos: Product[] = [
		new Product(12,"Smartphone","LG","Quadcore 3GHZ", 12018.5,5,[
																		new Especificacion('at1','val1','un1'),
																		new Especificacion('at2','val1','un1')
																		]), 
		new Product(123,"Smartwatch", "Sony", "3GB Ram", 4999.9,0,[
																		new Especificacion('at3','val1','un1'),
																		new Especificacion('at4','val1','un1')
																		] ), 
		new Product(34,"SmartTV", "Sony", "52 pulgadas, Conexión wifi", 8999.9,3,[
																		new Especificacion('at5','val1','un1'),
																		new Especificacion('at6','val1','un1')
																		] )
	  ]; 

	productosMonitoreados: Product[] = [];

	productosBusqueda: Product[] = [];

	// Si cambia algo que se notifiquen a los demas 
	productsSubject = new Subject<Product[]>();





  constructor() {

  	// this.productos = [
    //   new Product(12,"Smartphone","LG","Quadcore 3GHZ", 12018.5,5,[
    //   																new Especificacion('at1','val1','un1'),
    //   																new Especificacion('at2','val1','un1')
    //   																]), 
    //   new Product(123,"Smartwatch", "Sony", "3GB Ram", 4999.9,0,[
    //   																new Especificacion('at3','val1','un1'),
    //   																new Especificacion('at4','val1','un1')
    //   																] ), 
    //   new Product(34,"SmartTV", "Sony", "52 pulgadas, Conexión wifi", 8999.9,3,[
    //   																new Especificacion('at5','val1','un1'),
    //   																new Especificacion('at6','val1','un1')
    //   																] )
    // // ];

	// console.log(this.productos);
  }


  busqueda(bus,modo){
	  console.log(modo);

	  this.productosBusqueda = [];

	if(modo == '/monitoreo'){
		this.productosMonitoreados.forEach((element) => {
			let bnombre = String(element.nombre);
			bnombre = bnombre.toLocaleUpperCase();
			let bdescripcion = String(element.descripcion);
			bdescripcion = bdescripcion.toLocaleUpperCase();
	  
			if( bnombre.includes(bus) || bdescripcion.includes(bus) ){
			  console.log(element);
				this.productosBusqueda.push(element);
			}
		  }, this);
	}else if(modo == '/product'){
		console.log('entro a product')
		this.productos.forEach((element) => {
			let bnombre = String(element.nombre);
			bnombre = bnombre.toLocaleUpperCase();
			let bdescripcion = String(element.descripcion);
			bdescripcion = bdescripcion.toLocaleUpperCase();
	  
			if( bnombre.includes(bus) || bdescripcion.includes(bus) ){
			  console.log(element);
				this.productosBusqueda.push(element);
			}
		  }, this);
	}


	  return this.productosBusqueda;
  }

  eliminar(id){
	  this.productos.filter(el => el.uid !== id);
	//  return this.
	// const index = this.productos.indexOf(id);
	// if (index > -1) {
  	// 	array.splice(index, 1);
	// }
  }

  // Ejemplo masomenos de como funcionario 
  delete(){
	  // Eliminamos un usuario
	  this.productos.pop();
	  //mandamos a notificar a todos del cambio
	  this.productsSubject.next(this.productos);
  }

	getProductById(id) {
		let p;
	  this.productos.forEach(element =>{
		if(element.uid == id) {
			p = element;
		}
	  });
	  return p;
	  }
	  
	deleteProductById(id){
		let arrAux: Product[] = [];
		this.productos.forEach(element =>{
			if(element.uid != id) {
				arrAux.push(element);
			}
		  });
		this.productos = arrAux;
	}

	agregarProductosMonitoreo(arrIdProductos){

		// Filtrar de arrId los que ya estan.
		if(this.productosMonitoreados.length > 0){
			let arrAux = [];
			for (let i=0; i <= arrIdProductos.length; i++){
				this.productosMonitoreados.forEach( item => {
					if(arrIdProductos[i] != item.uid){
						arrAux.push(arrIdProductos[i]);
					}
				});
			}
			console.log(arrAux);
		for (let i=0; i <= arrAux.length; i++){
			this.productos.forEach(element =>{
			  if(element.uid == arrAux[i]){
					this.productosMonitoreados.push(element);
			  }
			})
		}
		}else{
			//console.log(arrAux);
			for (let i=0; i <= arrIdProductos.length; i++){
				this.productos.forEach(element =>{
				  if(element.uid == arrIdProductos[i]){
						this.productosMonitoreados.push(element);
				  }
				})
			}
		}
		


	}

	deleteProductMonitoreadoById(id){
		let arrAux: Product[] = [];
		this.productosMonitoreados.forEach(element =>{
			if(element.uid != id) {
				arrAux.push(element);
			}
		  });
		  this.productosMonitoreados = arrAux;
	}


	getproductosMonitoreados(): Product[] {
		return this.productosMonitoreados.slice();
	}

	getLastId(){
		return this.productos[this.productos.length -1].uid;
	}


}
