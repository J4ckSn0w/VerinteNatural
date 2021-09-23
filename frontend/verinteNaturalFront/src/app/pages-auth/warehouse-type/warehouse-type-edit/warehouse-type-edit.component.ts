import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { WarehouseTypeService } from '../../../services/warehouse-type.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-warehouse-type-edit',
  templateUrl: './warehouse-type-edit.component.html',
  styleUrls: ['./warehouse-type-edit.component.css']
})
export class WarehouseTypeEditComponent implements OnInit {

  sub;
  show;

  currentWarehouseType = {
    name:''
  }

  editWarehouseTypeForm = new FormGroup({
    name: new FormControl(null,[Validators.required])
  });

  constructor(
    private router: Router,
    private warehouseTypeService:WarehouseTypeService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.fnLoadWarehouseTypeInfo();

    //Show or Edit
    this.sub = this.route.queryParams.subscribe(params => {
      if(params.show == "true"){
        this.show = true;
      }
      else{
        this.show = false;
      }
    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.sub.unsubscribe();
  }

  fnLoadWarehouseTypeInfo(){
    this.warehouseTypeService.fnGetWarehouseTypeById(this.route.snapshot.params.id)
    .then(res => {
      this.currentWarehouseType = res.data;
    })
    .catch(rej => {
      this.fnLoadWarehouseTypeInfo();
    });
  }

  onSubmit(){
    console.log('EO');
    let data = {
      name: (this.editWarehouseTypeForm.value.name == undefined) ? this.currentWarehouseType.name : this.editWarehouseTypeForm.value.name
    };
    this.warehouseTypeService.fnPutEditWarehouseType(data,this.route.snapshot.params.id)
    .then(res => {
      Swal.fire({
        icon:'success',
        title:'Correcto!',
        text:'Se edito el tipo de almacen correctamente',
        didClose:() => {
          this.router.navigate(["/system/warehouse-type"]);
        }
      })
    })
    .catch(rej => {
      Swal.fire({
        icon:'error',
        title:'Error!',
        text:'Ocurrio un error al intentar editar el tipo de almacen'
      });
    });
  }

}
