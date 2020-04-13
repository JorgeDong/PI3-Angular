import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../../models/product';
import { ProductsService } from '../../../../services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.sass']
})
export class ProductDetailComponent implements OnInit {

  id: number;
  producto: Product;

  constructor(private route: ActivatedRoute, private router: Router,private productsService: ProductsService) { 
  }

  ngOnInit(): void {
    this.route.params.subscribe((params)=> this.id = params.id);
    this.producto = this.productsService.getProductById(this.id);
  }

}
