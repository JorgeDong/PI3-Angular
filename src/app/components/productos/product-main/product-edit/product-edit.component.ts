import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../../services/products.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';

import { Especificacion } from '../../../../models/especificacion';
import { Product } from '../../../../models/product'

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.sass']
})
export class ProductEditComponent implements OnInit {

  lastPlus;
  arrAtributes: Especificacion[] = [];

  atributoT;
  valorT;
  unidadT;

  nombret;
  existenciat;

  modoComponente;
  id;

  producto: Product;

  marcas = ['SONY','LG','HP'];

  activar = false;

  constructor(private productService: ProductsService,  private router: Router,private route: ActivatedRoute) {
    this.nombret = ''; 
    this.existenciat = 0;
  }

  ngOnInit(): void {


    this.lastPlus = this.productService.getLastId();
    this.lastPlus++;

    console.log(this.router.url)
    console.log(this.router.url.length);
    console.log(this.router.url.substring(0, 13));

    this.route.params.subscribe((params)=> this.id = params.id);
    console.log(this.id);
    if(this.id == undefined){
      this.modoComponente = 'nuevo';
    }else{
      this.modoComponente = 'editar';
      this.producto = this.productService.getProductById(this.id);
      this.arrAtributes = this.producto.especificacion;

    }

    

  }

  // activatebutton(){
  //   this.activar = this.busqueda.length > 3
  // }

  submit(forma: NgForm) {
    console.log(forma);
    console.log(forma.value);
   // forma.reset();}

   if(this.modoComponente == 'editar'){
    let newProduct = new Product(
      this.lastPlus,
      forma.value.name,
      forma.value.marca,
      forma.value.desc,
      forma.value.precio,
      forma.value.existencia,
      this.arrAtributes);
      console.log("Nuevo Producto");
      console.log(newProduct);

      let arrTemp = [];
      arrTemp.push(newProduct);

      this.productService.productos.map(obj => arrTemp.find(o => o.uid === obj.uid) || obj);


    //this.productService.productos.push(newProduct); 


   }else{
    let newProduct = new Product(
      this.lastPlus,
      forma.value.name,
      forma.value.marca,
      forma.value.desc,
      forma.value.precio,
      forma.value.existencia,
      this.arrAtributes);
      console.log("Nuevo Producto");
      console.log(newProduct);

      let existe = false;

      this.productService.productos.forEach( (item) =>{
        if(item.uid === this.lastPlus){
          existe = true;
        }
      });

      if(!existe){
        this.productService.productos.push(newProduct); 
      }else{
        console.log('existe')
      }

   }

   
  }

  agregarAtributo(){
    let tempAt:Especificacion = new Especificacion(this.atributoT,this.valorT,this.unidadT); 
    console.log(tempAt);
    this.arrAtributes.push(tempAt);

    console.log(this.arrAtributes);
    this.atributoT = '';
    this.valorT = '';
    this.unidadT = '';
  }

  eliminarAtributo(atributoT){
    let arrAux: Especificacion[] = [];
		this.arrAtributes.forEach(element =>{
      if(element.atributo != atributoT.atributo && element.valor != atributoT.valor 
        && element.unidad != atributoT.unidad ) {
				arrAux.push(element);
			}
		  });
		this.arrAtributes = arrAux;

      console.log(this.arrAtributes);
  }



}
