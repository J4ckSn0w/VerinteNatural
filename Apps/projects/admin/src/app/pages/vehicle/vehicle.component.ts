import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VehicleService } from '../../services/vehicle.service';
import Swal from 'sweetalert2';
import { VehicleTypeService } from '../../services/vehicle-type.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  /*Modal Inicio*/
  newForm = new FormGroup({
    license_plate: new FormControl(null,[Validators.required]),
    brand: new FormControl(null,[Validators.required]),
    description: new FormControl(null,[Validators.required]),
    vehicle_type_id: new FormControl(null,[Validators.required])
  });

  currentView = 0;
  arrayViewsNames = ['Nuevo tipo producto','Editar tipo producto','Info tipo producto'];

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
    this.fnLoadVehicles();
  }

  fnOpenModal(){
    this.modalService.open(this.myModal).result.then((result) => {

    },(reason) => {
      this.getDismissReason(reason);
    })
  }

  @ViewChild('myModal') myModal:ElementRef;

  /**Modal Final */

  arrayVehicles = [];

  arrayVehicleTypes = [];

  currentVehicle = {
    id:'',
    license_plate:'',
    brand:'',
    description:'',
    vehicle_type_id:''
  }

  constructor(
    private modalService: NgbModal,
    private vehicleService: VehicleService,
    private vehicleTypeService: VehicleTypeService
  ) { }

  ngOnInit(): void {
    this.fnLoadVehicles();
  }
  fnLoadVehicles(){
    this.arrayVehicleTypes = [];
    this.arrayVehicles = [];
    this.vehicleService.fnGetVehicles()
    .then(res => {
      res.data.forEach(element => {
        this.arrayVehicles.push(element);
      })
    });
    this.vehicleTypeService.fnGetVehicleTypes()
    .then(res => {
      res.data.forEach(element => {
        this.arrayVehicleTypes.push(element);
      });
    })
  }

  fnLoadVehicleInfo(id){
    this.currentView = 1;
    console.log('ID');
    console.log(id);
    this.vehicleService.fnGetVehicleById(id)
    .then(res => {
      console.log('Dentro');
      console.log(res.data);
      this.currentVehicle = res.data;
      console.log('Despues de asignar');
      console.log(this.currentVehicle);
      this.fnOpenModal();
    });
  }

  fnDelete(id){
    Swal.fire({
      icon:'warning',
      title:'Eliminar vehiculo',
      text:'Desea eliminar este vehiculo?',
      showConfirmButton:true,
      showDenyButton:true,
      confirmButtonText:'No',
      denyButtonText:'Si'
    }).then((result) => {
      if(result.isDenied){
        this.vehicleService.fnDeleteVehicle(id)
        .then(res => {
          Swal.fire({
            icon:'success',
            title:'Correcto',
            text:'Se elimino el vehiculo correctamente',
            didClose: () => {
              this.fnLoadVehicles();
            }
          })
        })
        .catch(rej => {
          Swal.fire({
            icon:'error',
            title:'Error!',
            text:'Ocurrio un error al intentar eliminar el vehiculo.'
          })
        })
      }
    })
    .catch(rej => {

    });
  }

  fnEdit(id){
    this.show = false;
    this.fnLoadVehicleInfo(id);
  }

  fnVer(id){
    this.show = true;
    this.fnLoadVehicleInfo(id);
  }

  fnNew(){
    this.currentView = 0;
    this.fnOpenModal();
  }

  onSubmitNew(){
    let data = {
      license_plate: this.newForm.value.license_plate,
      brand: this.newForm.value.brand,
      description: this.newForm.value.description,
      vehicle_type_id: this.newForm.value.vehicle_type_id
    };
    this.vehicleService.fnPostNewVehicle(data)
    .then(res =>{
      Swal.fire({
        icon:'success',
        title:'Correcto!',
        text:'Se creo el ',
        didClose: () => {
          //this.router.navigate(["/system/vehicle"]);
          //this.fnLoadVehicles();
          this.fnCloseModal();
        }
      })
    })
    .catch(rej => {
      Swal.fire({
        icon:'error',
        title:'Error!',
        text:'Algo salio mal'
      })
    })
  }
  onSubmitEdit(){
    let data = {
      license_plate : (this.newForm.value.license_plate == undefined) ? this.currentVehicle.license_plate : this.newForm.value.license_plate,
      brand : (this.newForm.value.brand == undefined) ? this.currentVehicle.brand : this.newForm.value.brand,
      description: (this.newForm.value.description == undefined) ? this.currentVehicle.description : this.newForm.value.description,
      vehicle_type_id: (this.newForm.value.vehicle_type_id == undefined) ? this.currentVehicle.vehicle_type_id : this.newForm.value.vehicle_type_id
    };
    this.vehicleService.fnPostUpdateVehicle(data,this.currentVehicle.id)
    .then(res => {
      Swal.fire({
        icon:'success',
        title:'Correcto!',
        text:'Se edito el vehiculo con exito.',
        didClose: () => {
          //this.router.navigate(["/system/vehicle"])
          this.fnCloseModal();
        }
      })
    })
    .catch(rej => {
      Swal.fire({
        icon:'error',
        title:'Error!',
        text:'Ocurrio un error al intentar editar el vehiculo.',
        didClose: () => {
        }
      });
    })
  }

}
