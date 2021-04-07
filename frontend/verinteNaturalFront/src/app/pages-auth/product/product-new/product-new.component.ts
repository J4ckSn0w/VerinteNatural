import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { ProductTypeService } from '../../../services/product-type.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent implements OnInit {

  arrayProductTypes = [];

  newProductForm = new FormGroup({
    name: new FormControl(null,[Validators.required]),
    descriptoion: new FormControl(null,[Validators.required]),
    product_is_by_part: new FormControl(null,[Validators.required]),
    product_type_id: new FormControl(null,[Validators.required])
  });

  constructor(
    private productService: ProductService,
    private ProductTypeService: ProductTypeService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.fnLoadProductTypes();
  }

  fnLoadProductTypes(){
    this.arrayProductTypes = [];
    this.ProductTypeService.fnGetProductTypes()
    .then(res => {
      res.data.forEach(element => {
        this.arrayProductTypes.push(element);
      })
    })
    .catch(rej => {
      this.fnLoadProductTypes();
    })
  }

  onSubmit(){
    let data = {
      name : this.newProductForm.value.name,
      description: this.newProductForm.value.description,
      product_is_by_part: this.newProductForm.value.product_is_by_part
    };
    this.productService.fnPostNewProduct(data)
    .then(res => {
      Swal.fire({
        icon:'success',
        title:'Correcto!',
        text:'Se agrego el nuevo producto correctamente.',
        didClose:() => {
          this.router.navigate(["/system/product"]);
        }
      })
    })
    .catch(rej => {
      Swal.fire({
        icon:'error',
        title:'Error!',
        text:'Ocurrio un error al intentar agregar el nuevo producto'
      })
    })
  }

}
