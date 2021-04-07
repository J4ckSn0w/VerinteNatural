import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductTypeService } from '../../../services/product-type.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-type-new',
  templateUrl: './product-type-new.component.html',
  styleUrls: ['./product-type-new.component.css']
})
export class ProductTypeNewComponent implements OnInit {

  newProductTypeForm = new FormGroup({
    name: new FormControl(null,[Validators.required])
  });

  constructor(
    private productTypeService : ProductTypeService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    let data = {
      name : this.newProductTypeForm.value.name
    };
    this.productTypeService.fnPostNewProductType(data)
    .then(res => {
      Swal.fire({
        icon:'success',
        title:'Correcto',
        text:'Se creo el nuevo tipo de producto.',
        didClose:() => {
          this.router.navigate(["/system/product-type"]);
        }
      })
    })
    .catch()
  }

}
