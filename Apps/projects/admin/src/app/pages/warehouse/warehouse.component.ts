import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { WarehouseService } from '../../services/warehouse.service';
import { WarehouseTypeService } from '../../services/warehouse-type.service';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {

  /*Modal Inicio*/
  newForm = new FormGroup({
    name: new FormControl(null,[Validators.required]),
    address: new FormControl(null,[Validators.required]),
    warehouse_type_id: new FormControl(null,[Validators.required]),
    leader_id: new FormControl(null)
  });

  currentView = 0;
  arrayViewsNames = ['Nuevo almacen','Editar almacen','Info almacen'];

  show  = false;

  closeResult = '';

  getDismissReason(reason:any):string{
    if(reason == ModalDismissReasons.ESC){
      return 'by pressing ESC';
    } else if (reason == ModalDismissReasons.BACKDROP_CLICK){
      return 'by clicking on a background';
    } else{
      return `with ${reason}`;
    }
  }

  /**Modal Final */

  arrayUsers = [];
  arrayWarehouseTypes = [];

  arrayWarehouses = [];

  currentWarehouse = {
    name:'',
    id:'',
    address:'',
    warehouse_type_id:'',
    user_id:'',
    employee_id:'',
    leader_id:'',
    warehouse_type:{
      id:''
    }
  }

  constructor(
    private modalService: NgbModal,
    private warehouseService: WarehouseService,
    private warehouseTypeService: WarehouseTypeService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.fnLoadWarehouses();
  }

  fnNew(myModal){
    this.currentView = 0;
    this.show = false;
    this.modalService.open(myModal).result.then((result) => {

    },(reason) => {
      
    })
  }

  fnVer(myModal,id){
    this.show = true;
    this.fnViewinfo(id,myModal);
  }
  fnEdit(myModal,id){
    this.show = false;
    this.fnViewinfo(id,myModal);
  }

  fnViewinfo(id,myModal){
    this.currentView = 1;
    this.fnLoadWarehouseInfo(id);
    this.modalService.open(myModal).result.then((result) => {

    },(reason) => {
      
    });
  }
  fnDelete(){}

  fnLoadWarehouses(){
    this.arrayUsers = [];
    this.arrayWarehouseTypes = [];
    this.arrayWarehouses = [];
    this.warehouseService.fnGetWarehouses()
    .then(res => {
      res.data.forEach(element => {
        this.arrayWarehouses.push(element);
      })
    })
    .catch(rej => {
    });
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
    });

    console.log('Despues de llegar');
    console.log(this.arrayWarehouses);
    console.log(this.arrayUsers);
  }

  fnLoadWarehouseInfo(id){ 
    this.arrayUsers = [];
    this.arrayWarehouseTypes = [];
    //this.arrayWarehouses = [];
    this.warehouseService.fnGetWarehouseById(id)
    .then(res => {
      console.log('Warehouse info');
      this.currentWarehouse = res.data;
      console.log(res.data);
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
    });
  }

  fnCloseModal(){
    this.fnLoadWarehouses();
    this.modalService.dismissAll();
  }

  onSubmitNew(){
    let data = {
      name : this.newForm.value.name,
      address: this.newForm.value.address,
      warehouse_type_id: this.newForm.value.warehouse_type_id,
      leader_id: this.newForm.value.leader_id
    }
    this.warehouseService.fnPostNewWarehouse(data)
    .then(res => {
      Swal.fire({
        icon:'success',
        title:'Creado',
        text:'Se agrego el nuevo almacen',
        didClose: () =>{
          //this.router.navigate(["/system/warehouse"]);
          this.fnCloseModal();
        }
      })
    })
    .catch(rej => {
      Swal.fire({
        icon:'error',
        title:'Error!',
        text:'Ocurrio un error, favor de revisar la informacion.',
        didClose:() => {
          //this.router.navigate(["/system/warehouse"]);
          this.fnCloseModal();
        }
      })
    });
  }

  onSubmitEdit(d){
    console.log(this.newForm);
    let data = {
      name : (this.newForm.value.name == undefined) ? this.currentWarehouse.name : this.newForm.value.name,
      address: (this.newForm.value.address == undefined) ? this.currentWarehouse.address : this.newForm.value.address,
      warehouse_type_id: (this.newForm.value.warehouse_type_id == undefined) ? this.currentWarehouse.warehouse_type_id : this.newForm.value.warehouse_type_id,
      leader_id: (this.newForm.value.employee_id == undefined) ? this.currentWarehouse.leader_id : this.newForm.value.employee_id
    };
    console.log('Data en editar');
    console.log(data);
    this.warehouseService.fnPostEditWarehouse(data,this.currentWarehouse.id)
    .then(res => {
      Swal.fire({
        icon: 'success',
        title: 'Se edito el almacen',
        text: 'El almacen se edito correctamente',
        didClose: () => {
          //this.router.navigate(["/system/warehouse"]);
          this.fnCloseModal();
        }
      })
    })
    .catch(rej => {
      Swal.fire({
        icon:'error',
        title: 'Error!',
        text: 'Algo salio mal.',
        didClose: () => {
          //this.router.navigate(["/system/warehouse"]);
          this.fnCloseModal();      
        }
      });
      console.log('ERROR AL EDITAR');
      console.log(rej);
    });
  }
}
