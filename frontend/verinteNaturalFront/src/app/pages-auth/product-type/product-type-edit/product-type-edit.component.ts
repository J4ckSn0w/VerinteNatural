import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductTypeService } from '../../../services/product-type.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-type-edit',
  templateUrl: './product-type-edit.component.html',
  styleUrls: ['./product-type-edit.component.css']
})
export class ProductTypeEditComponent implements OnInit {

  currentProductType = {
    name:''
  };

  editProductTypeForm = new FormGroup({
    name: new FormControl(null,[Validators.required])
  })

  constructor(
    private productTypeService: ProductTypeService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.fnLoadProductType();
  }

  fnLoadProductType(){
    this.productTypeService.fnGetProductType(this.route.snapshot.params.id)
    .then(res => {
      this.currentProductType = res.data;
    })
    .catch(rej => {

    })
  }

  onSubmit(){
    let data = {
      name: (this.editProductTypeForm.value.name == undefined) ? this.currentProductType.name : this.editProductTypeForm.value.name
    };
    this.productTypeService.fnPutEditProductTypes(data,this.route.snapshot.params.id)
    .then(res => {
      Swal.fire({
        icon:'success',
        title:'Correcto!',
        text:'Se edico el tipo de producto correctament',
        didClose:() => {
          this.router.navigate(["/system/product-type"]);
        }
      })
      })
    .catch(rej => {
      Swal.fire({
        icon:'error',
        title:'Error!',
        text:'Algo salio mal al intentar editar el tipo de producto.'
      })
    })
  }

}
