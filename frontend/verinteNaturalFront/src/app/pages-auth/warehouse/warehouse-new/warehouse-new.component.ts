import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WarehouseService } from '../../../services/warehouse.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../../../services/user.service';
import { WarehouseTypeService } from '../../../services/warehouse-type.service';

@Component({
  selector: 'app-warehouse-new',
  templateUrl: './warehouse-new.component.html',
  styleUrls: ['./warehouse-new.component.css']
})
export class WarehouseNewComponent implements OnInit {

  arrayWarehouseTypes = [];
  arrayusers = [];

  currentWarehouse = {
    name: '',
    address: '',
    warehouse_type_id: '',
    user_id: ''
  }

  newWarehouseForm = new FormGroup({
    name: new FormControl(null,[Validators.required]),
    address: new FormControl(null,[Validators.required]),
    warehouse_type_id: new FormControl(null,[Validators.required]),
    user_id: new FormControl(null,[Validators.required])
  });

  constructor(
    private warehouseService: WarehouseService,
    private router: Router,
    private userService: UserService,
    private warehouseTypeService : WarehouseTypeService
  ) { }

  ngOnInit(): void {
    this.fnLoadUsers();
    this.fnLoadWarehouseTypes();
  }

  fnLoadWarehouseTypes(){
    this.warehouseTypeService.fnGetWarehouses()
    .then(res => {
      res.data.forEach(element => {
        this.arrayWarehouseTypes.push(element);
      })
    })
    .catch(rej => {
      this.fnLoadWarehouseTypes();
    })
  }

  fnLoadUsers(){
    this.userService.fnGetUsers()
    .then(res => {
      res.data.forEach(element => {
        this.arrayusers.push(element);
      })
    })
    .catch(rej => {
      this.fnLoadUsers();
    })
  }

  onSubmit(){
    let data = {
      name : (this.newWarehouseForm.value.name == undefined) ? this.currentWarehouse.name : this.newWarehouseForm.value.name,
      address: (this.newWarehouseForm.value.address == undefined) ? this.currentWarehouse.address : this.newWarehouseForm.value.address,
      warehouse_type_id: (this.newWarehouseForm.value.warehouse_type_id == undefined) ? this.currentWarehouse.warehouse_type_id : this.newWarehouseForm.value.warehouse_type_id,
      user_id: (this.newWarehouseForm.value.user_id == undefined) ? this.currentWarehouse.user_id : this.newWarehouseForm.value.user_id
    };
    this.warehouseService.fnPostNewWarehouse(data)
    .then(res => {
      Swal.fire({
        icon:'success',
        title:'Creado',
        text:'Se agrego el nuevo almacen',
        didClose: () =>{
          this.router.navigate(["/system/warehouse"]);
        }
      })
    })
    .catch(rej => {
      Swal.fire({
        icon:'error',
        title:'Error!',
        text:'Ocurrio un error, favor de revisar la informacion.',
        didClose:() => {
          this.router.navigate(["/system/warehouse"]);
        }
      })
    });
  }

}
