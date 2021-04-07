import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-control',
  templateUrl: './product-control.component.html',
  styleUrls: ['./product-control.component.css']
})
export class ProductControlComponent implements OnInit {

  arrayProducts = [];

  constructor(
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.fnLoadProducts();
  }

  fnLoadProducts(){
    this.productService.fnGetProducts()
    .then(res =>{
      res.data.forEach(element => {
        this.arrayProducts.push(element);
      })
    })
    .catch(rej => {
      //this.fnLoadProducts();
    })
  }

  fnDelete(id){
    Swal.fire({
      icon:'warning',
      title:'Eliminar Producto',
      text:'Desea eliminar este producto?',
      showDenyButton:true,
      denyButtonText:'Si',
      confirmButtonText:'No'
    }).then(result => {
      if(result.isDenied){
        this.productService.fnDeleteProduct(id)
        .then(res => {
          Swal.fire({
            icon:'success',
            title:'Correcto!',
            text:'Se elimino el producto correctamente',
            didClose:() => {
              this.router.navigate(["/system/products"]);
            }
          })
        })
        .catch(rej => {
          Swal.fire({
            icon:'error',
            title:'Error!',
            text:'Ocurrio un error al intentar eliminar el producto'
          });
        })
      }
    })
  }

  fnEdit(id){
    this.router.navigate(["/system/product/edit",id]);
  }

}
