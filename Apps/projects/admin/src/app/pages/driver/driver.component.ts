import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DriverService } from '../../services/driver.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VehicleService } from '../../services/vehicle.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {

  /*Modal Inicio*/
  newForm = new FormGroup({
    name: new FormControl(null,[Validators.required]),
    rate: new FormControl(null),
    vehicle_id: new FormControl(null)
  });

  currentView = 0;
  arrayViewsNames = ['Nuevo conductor','Editar conductor','Info conductor'];

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
    /**Funcion para cargar la informacion de nuevo depsues de incambio */
    //this.fnLoadProducts();
  }

  fnOpenModal(){
    this.modalService.open(this.myModal).result.then((result) => {

    },(reason) => {
      this.getDismissReason(reason);
    })
  }

  @ViewChild('myModal') myModal:ElementRef;

  /**Modal Final */

  arrayDrivers = [];
  arrayVehicles = [];

  currentDriver = {
    name:'',
    rate:'',
    vehicle_id:'',
    employee_number:'',
    id:''
  };

  constructor(
    private driverService : DriverService,
    private vehicleService: VehicleService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.fnLoadDrivers();
  }

  fnEdit(id){
    this.show = false;
    this.fnLoadDriverInfo(id);
  }

  fnDelete(){}

  fnVer(id){
    this.show = true;
    this.fnLoadDriverInfo(id);
  }

  fnLoadDrivers(){
    this.arrayDrivers = [];
    this.driverService.fnGetDriversAll()
    .then(res => {
      console.log('RESPUESTA');
      console.log(res);
      res.data.forEach(element => {
        this.arrayDrivers.push(element);
      }); 
    })
    .catch(rej => {
      console.log('ERROR');
      console.log(rej);
    })
  }

  fnLoadDriverInfo(id){
    this.driverService.fnGetDriverById(id)
    .then(res => {
      console.log('Despues');
      console.log(res);
      this.currentDriver = res.data;

      this.arrayVehicles = [];
      this.vehicleService.fnGetVehicles()
      .then(res => {
        console.log('Antes de for each');
        console.log(res);
        res.data.forEach(element => {
          this.arrayVehicles.push(element);
        });
        console.log('Despues');
        console.log(this.arrayVehicles);

        this.currentView = 1;
        this.fnOpenModal();
      })
      .catch(rej => {
        console.log('ERROR VEHICULOS');
        console.log(rej);
      });

      
    })
    .catch(rej => {

    });
    
  }

  onSubmitEdit(){
    let data = {
      name: (this.newForm.value.name == undefined) ? this.currentDriver.name : this.newForm.value.name,
      rate: (this.newForm.value.rate == undefined) ? this.currentDriver.rate : this.newForm.value.rate,
      vehicle_id:(this.newForm.value.vehicle_id == undefined || this.newForm.value.vehicle_id == 0) ? this.currentDriver.vehicle_id : this.newForm.value.vehicle_id,
      id:this.currentDriver.id
    };
    console.log('Data');
    console.log(data);
    this.driverService.fnEditDriver(data)
    .then(res => {
      Swal.fire({
        icon:'success',
        title:'Correcto',
        text:'Se edito la informacion del conductor correctamente',
        didClose:() => {
          this.fnLoadDrivers();
        }    
      })
    })
  }

}
