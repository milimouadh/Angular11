import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {Product} from '../../model/product.model';
import {Observable, of} from 'rxjs';
import {catchError, map, startWith} from 'rxjs/operators';
import {AppDataState, DataStateEnum} from '../../state/product.state';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  /*products?:Product[];*/
  products$:Observable<AppDataState<Product[]>>| null=null;
  readonly DataStateEnum=DataStateEnum;

  constructor(private productsService:ProductsService) { }

  ngOnInit(): void {
  }

  onGetAllProducts() {
    /*this.productsService.getAllProducts().subscribe(data=>{
      this.products=data;
    },error => {
      console.log("ereur get produit")
    })*/
    console.log("Start...");
    this.products$=this.productsService.getAllProducts().pipe(

        map(data=>{
          console.log(data);
          return({dataState:DataStateEnum.LOADED , data:data})
        }),
        startWith({dataState:DataStateEnum.LOADING}),
        catchError(err =>of ({dataState:DataStateEnum.ERROR , errorMessage:err.message}))
      );
  }
}
