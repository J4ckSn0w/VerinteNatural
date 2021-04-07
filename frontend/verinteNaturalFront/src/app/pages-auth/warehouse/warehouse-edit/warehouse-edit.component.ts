import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WarehouseService } from '../../../services/warehouse.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { WarehouseTypeService } from '../../../services/warehouse-type.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-warehouse-edit',
  templateUrl: './warehouse-edit.component.html',
  styleUrls: ['./warehouse-edit.component.css']
})
export class WarehouseEditComponent implements OnInit {

  sub;
  show;

  arrayUsers = [];
  arrayWarehouseTypes = [];

  currentWarehouse = {
    name: '',
    address: '',
    warehouse_type_id:0,
    user_id:0
  };

  editWarehouseForm = new FormGroup({
    name: new FormControl(null,[Validators.required]),
    address: new FormControl(null,[Validators.required]),
    warehouse_type_id: new FormControl(null,[Validators.required]),
    user_id: new FormControl(null,[Validators.required])
  })

  constructor(
    private warehouseService: WarehouseService,
    private warehouseTypeService: WarehouseTypeService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.fnLoadWarehouseInfo();

    this.sub = this.route.queryParams.subscribe(params => {
      if(params.show == "true"){
        console.log('Dentro de true');
        console.log(params);
        this.show = true;
      }
      else{
        this.show = false;
        console.log('Dentro de else');
        console.log(params);
      }
    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.sub.unsubscribe();
  }

  fnLoadWarehouseInfo(){
    this.warehouseService.fnGetWarehouseById(this.route.snapshot.params.id)
    .then(res => {
      this.currentWarehouse = res.data;
      //console.log(res.data);
    })
    .catch()
    this.warehouseTypeService.fnGetWarehouses()
    .then(res => {
      res.data.forEach(element => {
        this.arrayWarehouseTypes.push(element);
      })
    })
    this.userService.fnGetUsers()
    .then(res => {
      res.data.forEach(element => {
        this.arrayUsers.push(element);
      })
    })
  }

  onSubmit(){
    let data = {
      name : (this.editWarehouseForm.value.name == undefined) ? this.currentWarehouse.name : this.editWarehouseForm.value.name,
      address: (this.editWarehouseForm.value.address == undefined) ? this.currentWarehouse.address : this.editWarehouseForm.value.address,
      warehouse_type_id: (this.editWarehouseForm.value.warehouse_type_id == undefined) ? this.currentWarehouse.warehouse_type_id : this.editWarehouseForm.value.warehouse_type_id,
      user_id: (this.editWarehouseForm.value.user_id == undefined) ? this.currentWarehouse.user_id : this.editWarehouseForm.value.user_id
    };
    this.warehouseService.fnPostEditWarehouse(data,this.route.snapshot.params.id)
    .then(res => {
      Swal.fire({
        icon: 'success',
        title: 'Se edito el almacen',
        text: 'El almacen se edito correctamente',
        didClose: () => {
          this.router.navigate(["/system/warehouse"]);
        }
      })
    })
    .catch(rej => {
      Swal.fire({
        icon:'error',
        title: 'Error!',
        text: 'Algo salio mal.',
        didClose: () => {
          this.router.navigate(["/system/warehouse"]);
        }
      })
    });
  }

}
