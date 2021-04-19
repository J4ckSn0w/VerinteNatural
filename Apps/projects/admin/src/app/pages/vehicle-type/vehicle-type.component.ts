import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VehicleTypeService } from '../../services/vehicle-type.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehicle-type',
  templateUrl: './vehicle-type.component.html',
  styleUrls: ['./vehicle-type.component.css']
})
export class VehicleTypeComponent implements OnInit {

  /*Modal Inicio*/
  newForm = new FormGroup({
    name: new FormControl(null,[Validators.required]),
    max_weight: new FormControl(null,[Validators.required]),
  });

  currentView = 0;
  arrayViewsNames = ['Nuevo tipo vehiculo','Editar tipo vehiculo','Info tipo vehiculo'];

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

  fnCloseModal(){
    this.modalService.dismissAll();
    /**Funcion para cargar informacion despues de una modificacion */
    //this.fnLoadProductTypes();
    this.fnLoadVehicleTypes();
  }

  fnOpenModal(){
    this.modalService.open(this.myModal).result.then((result) => {

    },(reason) => {
      this.getDismissReason(reason);
    })
  }

  @ViewChild('myModal') myModal:ElementRef;

  /**Modal Final */
  arrayVehiclesTypes = [];

  currentVehicleType = {
    name:'',
    max_weight: '',
    id:''
  };

  constructor(
    private modalService: NgbModal,
    private vehicleTypeService: VehicleTypeService
  ) { }

  ngOnInit(): void {
    this.fnLoadVehicleTypes();
  }

  fnNew(){
    this.currentView = 0;
    this.fnOpenModal();
  }
  fnDelete(id){
    Swal.fire({
      icon:'warning',
      title:'Eliminar tipo de vehiculo',
      text:'Esta seguro de eliminar este tipo de vehiculo?',
      showDenyButton:true,
      denyButtonText:'Si',
      confirmButtonText:'No'
    }).then(response => {
      if(response.isDenied){
        this.vehicleTypeService.fnDeleteVehicletype(id).
        then(res=> {
          this.fnLoadVehicleTypes();
        })
        .catch(rej => {
          Swal.fire({
            icon:'error',
            title:'Error!',
            text:'Ocurrio un error al intentar eliminar el tipo de vehiculo'
          });
        })
      }
    })
  }
  fnVer(id){
    this.show  = true;
    this.fnLoadVehicleTypeInfo(id);
  }
  fnEdit(id){
    this.show = false;
    this.fnLoadVehicleTypeInfo(id);
  }
  fnLoadVehicleTypes(){
    this.arrayVehiclesTypes = [];
    this.vehicleTypeService.fnGetVehicleTypes()
    .then(res => {
      res.data.forEach(element => {
        this.arrayVehiclesTypes.push(element);
      })
    });
  }
  fnLoadVehicleTypeInfo(id){
    this.vehicleTypeService.fnGetVehicleTypeById(id)
    .then(res => {
      this.currentVehicleType = res.data;
      console.log('DENTRO');
      console.log(res.data);
      this.currentView =  1;
      this.fnOpenModal();
    })
  }

  onSubmitNew(){
    let data = {
      name: this.newForm.value.name,
      max_weight: this.newForm.value.max_weight
    };
    this.vehicleTypeService.fnPostNewVehicleType(data)
    .then(res => {
      Swal.fire({
        icon:'success',
        title:'Correcto!',
        text:'Se creo el nuevo tipo de vehiculo correctamente',
        didClose:() => {
          //this.router.navigate(["/system/vehicle-type"]);
          this.fnCloseModal();
        }
      });
    })
    .catch(rej => {
      console.log(rej);
      Swal.fire({
        icon:'error',
        title:'Error!',
        text:'Ocurrio un error al intentar crear el nuevo tipo de vehiculo.'
      });
    });
  }
  onSubmitEdit(id){
    let data = {
      name: (this.newForm.value.name == undefined) ? this.currentVehicleType.name : this.newForm.value.name,
      max_weight: (this.newForm.value.max_weight == undefined) ? this.currentVehicleType.max_weight : this.newForm.value.max_weight
    };
    console.log('Data');
    console.log(data);
    console.log(id);
    this.vehicleTypeService.fnPostEditVehicleType(data,this.currentVehicleType.id)
    .then(res => {
      Swal.fire({
        icon:'success',
        title:'Correcto!',
        text:'Se edito el tipo de vehiculo correctamente',
        didClose:() => {
          //this.router.navigate(["/system/vehicle-type"]);
          this.fnCloseModal();
        }
      });
    })
    .catch(rej => {
      Swal.fire({
        icon:'error',
        title:'Error!',
        text:'Ocurrio un error al intentar editar el tipo de vehiculo'
      });
    })
  }

}
