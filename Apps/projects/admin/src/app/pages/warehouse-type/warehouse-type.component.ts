import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { WarehouseTypeService } from '../../services/warehouse-type.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-warehouse-type',
  templateUrl: './warehouse-type.component.html',
  styleUrls: ['./warehouse-type.component.css']
})
export class WarehouseTypeComponent implements OnInit {

  /*Modal Inicio*/
  newForm = new FormGroup({
    name:new FormControl(null,[Validators.required])
  });

  

  currentView = 0;
  arrayViewsNames = ['Nuevo tipo almacen','Editar tipo almacen','Info tipo almacen'];

  show  = false;

  closeResult = '';

  /**Modal Final */

  currentWarehouseType = {
    id:'',
    name:''
  }

  arrayWarehouseTypes = [];

  constructor(
    private warehouseTypeService: WarehouseTypeService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.fnLoadWarehouseTypes();
  }

  fnLoadWarehouseTypes(){
    this.arrayWarehouseTypes = [];
    this.warehouseTypeService.fnGetWarehouses()
    .then(res => {
      console.log('RESPONSE');
      console.log(res);
      res.data.forEach(element => {
        this.arrayWarehouseTypes.push(element);
      });
    })
    .catch(rej => {
      //this.fnGetWarehousetypes();
    });
  }

  fnLoadWarehouseTypeInfo(id){
    this.warehouseTypeService.fnGetWarehouseTypeById(id)
    .then(res => {
      this.currentWarehouseType = res.data;
    })
    .catch(rej => {
    });
  }

  fnEdit(MyModal,id){
    this.currentView = 1;
    this.show = false;
    this.fnLoadWarehouseTypeInfo(id);
    this.modalService.open(MyModal).result.then((result) => {

    },(reason) => {
      this.getDismissReason(reason);
    })
  }

  fnNew(MyModal){
    this.newForm.reset();
    this.currentView = 0;
    this.modalService.open(MyModal).result.then((result) => {
    },(reason) => {
      this.getDismissReason(reason);
    });
  }
  
  fnDelete(id){
    Swal.fire({
      icon:'warning',
      title:'Borrar tipo de almacen',
      text:'Desea borrar este tipo de almacen?',
      showDenyButton:true,
      denyButtonText:'Si'
    }).then(resultado => {
      if(resultado.isDenied){
        this.warehouseTypeService.fnDeleteWarehouseType(id)
        .then(res => {
          Swal.fire({
            icon:'success',
            title:'Correcto!',
            text:'Se borro el tipo de almacen correctamente',
            didClose:() => {
              //this.fnGetWarehousetypes();
              this.fnCloseModal();
            }
          })
        })
      }
    })
  }

  fnVer(MyModal,id){
    this.currentView = 1;
    this.show = true;
    this.fnLoadWarehouseTypeInfo(id);
    this.modalService.open(MyModal).result.then((result) => {

    },(reason) => {
      this.getDismissReason(reason);
    })
  }

  fnCloseModal(){
    this.modalService.dismissAll();
    this.fnLoadWarehouseTypes();
  }

  getDismissReason(reason:any):string{
    if(reason == ModalDismissReasons.ESC){
      return 'by pressing ESC';
    } else if (reason == ModalDismissReasons.BACKDROP_CLICK){
      return 'by clicking on a background';
    } else{
      return `with ${reason}`;
    }
  }

  onSubmitNew(){
    let data = {
      name:this.newForm.value.name
    };
    this.warehouseTypeService.fnPostNewWarehouseType(data)
    .then(res => {
      Swal.fire({
        icon:'success',
        title:'Correcto!',
        text:'Se creo el nuevo tipo de almacen correctamente',
        didClose:() => {
          //this.router.navigate(["/system/warehouse-type"]);
          //this.fnLoadWarehouseTypes();
          this.fnCloseModal();
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

  onSubmitEdit(){
    let data = {
      name:(this.newForm.value.name == undefined) ? this.currentWarehouseType.name : this.newForm.value.name
    }
    this.warehouseTypeService.fnPutEditWarehouseType(data,this.currentWarehouseType.id)
    .then(res => {
      Swal.fire({
        icon:'success',
        title:'Correcto!',
        text:'Se edito el tipo de almacen correctamente',
        didClose:() => {
          //this.router.navigate(["/system/warehouse-type"]);
          this.fnCloseModal();
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
