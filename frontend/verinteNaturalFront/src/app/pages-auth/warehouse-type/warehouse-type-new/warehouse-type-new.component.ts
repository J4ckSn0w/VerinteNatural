import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WarehouseTypeService } from '../../../services/warehouse-type.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-warehouse-type-new',
  templateUrl: './warehouse-type-new.component.html',
  styleUrls: ['./warehouse-type-new.component.css']
})
export class WarehouseTypeNewComponent implements OnInit {

  newWarehouseTypeForm = new FormGroup({
    name: new FormControl(null,[Validators.required])
  });

  constructor(
    private router:Router,
    private warehouseTypeService:WarehouseTypeService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    let data = {
      name: this.newWarehouseTypeForm.value.name
    };
    this.warehouseTypeService.fnPostNewWarehouseType(data)
    .then(res => {
      Swal.fire({
        icon:'success',
        title:'Correcto!',
        text:'Se creo el nuevo tipo de almacen correctamente',
        didClose:() => {
          this.router.navigate(["/system/warehouse-type"]);
        }
      })
    })
    .catch(rej => {
      Swal.fire({
        icon:'error',
        title:'Error!',
        text:'Algo salio mal al intentar crear el tipo de almacen',
        didClose:() => {
          console.log(rej);
        }
      })
    })
  }

}
