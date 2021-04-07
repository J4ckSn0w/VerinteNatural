import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductTypeService } from '../../../services/product-type.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-type-control',
  templateUrl: './product-type-control.component.html',
  styleUrls: ['./product-type-control.component.css']
})
export class ProductTypeControlComponent implements OnInit {

  arrayProductTypes = [];

  constructor(
    private router: Router,
    private productTypeService: ProductTypeService
  ) { }

  ngOnInit(): void {
    this.fnLoadProductTypes();
  }

  fnLoadProductTypes(){
    this.arrayProductTypes = [];
    this.productTypeService.fnGetProductTypes()
    .then(res => {
      res.data.forEach(element => {
        this.arrayProductTypes.push(element);
      });
    })
    .catch(rej => {

    })
  }

  fnEdit(id){
    this.router.navigate(["/system/product-type/edit",id]);
  }
  fnDelete(id){
    Swal.fire({
      icon:'warning',
      title:'Eliminar Tipo Producto',
      text:'Desea eliminar el tipo producto?',
      showDenyButton:true,
      denyButtonText:'Si',
      confirmButtonText:'No'
    }).then(result => {
      if(result.isDenied){
        this.productTypeService.fnDeleteProductType(id)
        .then(res => {
          Swal.fire({
            icon:'success',
            title:'Correcto!',
            text:'Se elimino el tipo de producto correctamente'
          });
          this.fnLoadProductTypes();
        })
        .catch(rej => {
          Swal.fire({
            icon:'error',
            title:'Error!',
            text:'Ocurrio un error al intentar eliminar el tipo de producto'
          })                                                                                                                                                                                                
        });
      }
    })
  }
}
