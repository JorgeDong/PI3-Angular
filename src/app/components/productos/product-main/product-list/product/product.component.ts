import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Product } from '../../../../../models/product';
import { ProductsService } from '../../../../../services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  providers: [ProductsService]
})
export class ProductComponent implements OnInit {

  @Input() producto: Product;
  @Output() contador = new EventEmitter();

  @Output() idMoniotear = new EventEmitter();
  modo: String;
  
  constructor(public productService: ProductsService,private router: Router) { }

  ngOnInit(): void {
    this.modo = this.router.url;
  }

  enviarIdParaEliminar(id){
    this.contador.emit(id);
  }

  enviarIdParaMonitorear(id){
    this.idMoniotear.emit(id);
  }

}
