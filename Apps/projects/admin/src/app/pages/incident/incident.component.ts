import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { IncidentTypeService } from '../../services/incident-type.service';
import { IncidentTypeComponent } from '../incident-type/incident-type.component';
import{ IncidentService } from '../../services/incidents.service'

@Component({
  selector: 'app-incident',
  templateUrl: './incident.component.html',
  styleUrls: ['./incident.component.css']
})
export class IncidentComponent implements OnInit {

  /*Modal Inicio*/
  newForm = new FormGroup({
    subject: new FormControl(null,[Validators.required]),
    description: new FormControl(null,[Validators.required]),
    incident_type_id: new FormControl(null,[Validators.required])
  });

  currentView = 0;
  arrayViewsNames = ['Nuevo reporte','Editar reporte','Info reporte'];

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

  tableLoad = false;

  /**Modal Final */

  constructor(
    private incidentService: IncidentService,
    private modalService: NgbModal,
    private userService: UserService,
    private indicentsTypesService: IncidentTypeService
  ) { }

  arrayIndicents = [];

  arrayIncidentsTypes = [];

  currentIncident = {
    subject:'',
    description:'',
    employee_id:'',
    incident_type_id:'',
    id:''
  }

  currentEmployee;

  ngOnInit(): void {
    this.fnLoadIncidents();
    //this.fnLoadEmployee();
    this.fnLoadIncidentTypes();
  }

  fnLoadIncidentTypes(){
    this.indicentsTypesService.fngetIncidentsTypes()
    .then(res => {
      res.data.forEach(element => {
        this.arrayIncidentsTypes.push(element);
      })
    })
    .catch(rej => {
      console.log('Error tipos de incidencias');
      console.log(rej);
    })
  }

  fnLoadEmployee(){
    console.log('Entre a Load Employee');
    this.userService.fnGetUserByToken()
    .then(res => {
      this.currentEmployee = res;
      console.log('Simon');
      console.log(this.currentEmployee);
      this.userService.fnGetUserById(this.currentEmployee.id)
      .then(res => {
        console.log('Mi data');
        console.log(res);
      })
      .catch(rej => {
        console.log('Error');
        console.log(rej);
      })
    })
    .catch(rej => {
      console.log('Algo salio mal');
      console.log(rej);
    });
  }

  fnNew(){
    this.currentView = 0;
    this.fnOpenModal();
  }

  fnEdit(id){
    this.fnLoadIncident(id);
    this.show = true;
    this.currentView = 1;
    this.fnOpenModal();
  }

  fnVer(id){
    this.fnLoadIncident(id);
    this.show = false;
    this.currentView = 1;
    this.fnOpenModal();
  }

  fnDelete(id){
    Swal.fire({
      icon:'question',
      title:'Elimiar?',
      text:'Desea eliminar la incidencia?',
      denyButtonText:'Si',
      confirmButtonText:'No',
      showDenyButton:true,
    }).then(result => {
      if(result.isDenied){
        this.incidentService.fnDeleteIncident(id)
        .then(res => {
          Swal.fire({
            icon:'success',
            title:'Correcto!',
            text:'Se elimino correctamente la incidencia',
            didClose:() => {
              this.fnLoadIncidents();
            }
          })
        })
        .catch(rej => {
          Swal.fire({
            icon:'error',
            title:'Error!',
            text:'Hubo un problema al intentar eliminar la incidencia'
          })
        })
      }
    })
  }

  fnLoadIncidents(){
    this.arrayIndicents = [];
    this.incidentService.fnGetIncidents()
    .then(res => {
      res.data.forEach(element => {
        this.arrayIndicents.push(element);
      });
      this.tableLoad = true;
      //this.fnOpenModal();
      console.log('Incident');
      console.log(res.data);
    });
  }

  fnLoadIncident(id){
    this.incidentService.fnGetIncidentById(id)
    .then(res => {
      this.currentIncident = res.data;
      this.newForm.controls['incident_type_id'].setValue(this.currentIncident.incident_type_id);
      this.newForm.value.incident_type_id = this.currentIncident.incident_type_id;
      console.log('Incident by id');
      console.log(res.data);
      console.log('Formulario');
      console.log(this.newForm);
    })
    .catch(rej => {
      console.log('Error al cargar incidencia');
      console.log(rej);
    })
  }

  onSubmitNew(){
    let data = {
      subject:this.newForm.value.subject,
      description:this.newForm.value.description,
      //employee_id:this.currentEmployee.employee_id,
      incident_type_id:this.newForm.value.incident_type_id
      //employee_id:this.currentEmployee.id
    };
    console.log('DATA');
    console.log(data);
    this.incidentService.fnPostNewIncident(data)
    .then(res => {
      Swal.fire({
        icon:'success',
        title:'Correcto',
        text:'Se creo correctamente la incidencia',
        didClose:() => {
          this.fnLoadIncidents();
          this.fnCloseModal();
        }
      })
    })
    .catch(rej => {
      console.log('ERROR');
      console.log(rej);
      let arrayErrores = '';
      //arrayErrores = rej.error.errors.employee_id[0];
      Swal.fire({
        icon:'error',
        title:'Error!',
        text:'Ocurrio un error al intentar crear la incidencia'
      })
    });
  }
  /*
  onSubmitEdit(){
    let data = {
      subject:this.newForm.value.subject,
      description:this.newForm.value.description,
      incident_type_id:this.newForm.value.incident_type_id,
      id:this.currentIncident.id
    };
    this.incidentService.fnPutEditIncident(data)
    .then(res => {
      this.fnLoadIncidents();
      this.fnCloseModal();
    })
    .catch(rej => {
      let arrayErrores = '';
      arrayErrores = rej.error.errors.employee_id[0];
      Swal.fire({
        icon:'error',
        title:'Error!',
        text:arrayErrores
      })
    });
  }*/

  /*Escalar incidencia */
  fnEscaleteIncident(id){
    Swal.fire({
      icon:'question',
      title:'Escalar incidencia',
      text:'Desea escalar esta incidencia a su superior?',
      denyButtonText:'No',
      showDenyButton:true,
      confirmButtonText:'Si'
    }).then(result => {
      if(result.isConfirmed){
        this.incidentService.fnEscaleteIncident(id)
        .then(res => {
          Swal.fire({
            icon:'success',
            title:'Correcto!',
            text:'La incidencia fue escalada con exito.'
          })
        })
        .catch(rej => {
          Swal.fire({
            icon:'error',
            title:'Error!',
            text:'Ocurrio un error al intentar escalar la incidencia.'
          })
          console.log('Error');
          console.log(rej);
        })
      }
    })
  }
  /*Cambiar incidencia a status 2, en proceso*/
  fnStartIncident(id){
    Swal.fire({
      icon:'question',
      title:'Iniciar incidencia',
      text:'Iniciar el proceso de la incidencia?',
      showDenyButton:true,
      denyButtonText:'No',
      confirmButtonText:'Si'
    }).then(result => {
      if(result.isConfirmed){
        this.incidentService.fnChangeStatus(id,2)
        .then(res => {
          Swal.fire({
            icon:'success',
            title:'Correcto!',
            text:'Se inicio la incidencia correctamente',
            didClose:() => {
              this.fnLoadIncidents();
            }
          })
        })
        .catch(rej => {
          Swal.fire({
            icon:'error',
            title:'Error!',
            text:'Hubo un error al intentar iniciar el proceso de la incidencia'
          })
        })
      }
    })
  }

  /*Cambiar incidencia a status 3 o 4, dependiendo de si se acepta o rechaza*/
  fnChangeIncidenStatus(id){
    Swal.fire({
      icon:'question',
      title:'Incidencia',
      text:'Cambiar el estado de la incidencia',
      showConfirmButton:true,
      showDenyButton:true,
      confirmButtonText:'Completada',
      denyButtonText:'Rechazada'
    }).then(result => {
      if(result.isConfirmed){
        this.incidentService.fnChangeStatus(id,3)
        .then(res => {
          Swal.fire({
            icon:'success',
            title:'Correcto!',
            text:'Se cambio la incidencia a "completada" correctamente',
            didClose:() => {
              this.fnLoadIncidents();
            }
          })
        })
        .catch(rej => {
          Swal.fire({
            icon:'error',
            title:'Error!',
            text:'Algo salio mal al intentar cambiar la incidencia a "completada"'
          })
        })
      } else if(result.isDenied){
        this.incidentService.fnChangeStatus(id,4)
        .then(res => {
          Swal.fire({
            icon:'success',
            title:'Correcto!',
            text:'Se cambio la incidencia a "rechazada" correctamente',
            didClose:() => {
              this.fnLoadIncidents();
            }
          })
        })
        .catch(rej => {
          Swal.fire({
            icon:'error',
            title:'Error!',
            text:'Algo salio mal al intentar cambiar la incidencia a "rechazada"'
          })
        })
      }
    })
  }
}
