import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IncidentTypeService } from '../../services/incident-type.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-incident-type',
  templateUrl: './incident-type.component.html',
  styleUrls: ['./incident-type.component.css']
})
export class IncidentTypeComponent implements OnInit {

  /*Modal Inicio*/
  newForm = new FormGroup({
    name: new FormControl(null,[Validators.required])
  });

  currentView = 0;
  arrayViewsNames = ['Nuevo tipo de incidencia','Editar tipo de incidencia','Info tipo de incidencia'];

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
    //this.fnLoadProductTypes();
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

  arrayIncidentsTypes = [];

  currentIncidentType = {
    id:'',
    name:''
  }

  constructor(
    private modalService: NgbModal,
    private incidentTypeService: IncidentTypeService
  ) { }

  ngOnInit(): void {
    this.fnLoadIncidentsTypes();
  }

  fnLoadIncidentsTypes(){
    this.tableLoad = false;
    this.arrayIncidentsTypes = [];
    this.incidentTypeService.fngetIncidentsTypes()
    .then(res => {
      res.data.forEach(element => {
        this.arrayIncidentsTypes.push(element);
      });
      this.tableLoad = true;
    })
    .catch(rej => {
      console.log('Error al cargar tipos de incidencias');
      console.log(rej);
    })
  }

  fnLoadIncidentTypeInfo(id){
    this.incidentTypeService.fnGetIndicidenttypeById(id)
    .then(res => {
      this.currentIncidentType = res.data;
    })
  }

  fnVer(id){
    this.fnLoadIncidentTypeInfo(id);
    this.currentView = 1;
    this.show = false;
    this.fnOpenModal();
  }
  fnEdit(id){
    this.fnLoadIncidentTypeInfo(id);
    this.show = true;
    this.currentView = 1;
    this.fnOpenModal();
  }
  fnDelete(id){
    Swal.fire({
      icon:'question',
      title:'Eliminar?',
      text:'Desea eliminar este tipo de incidencia?',
      showDenyButton : true,
      confirmButtonText:'No',
      denyButtonText:'Si'
    }).then(result => {
      if(result.isDenied){
        this.incidentTypeService.fnDeleteIndicentType(id)
        .then(res => {
          Swal.fire({
            icon:'success',
            title:'Correcto!',
            text:'Se elimino correctamente el tipo de incidencia',
            didClose:() => {
              this.fnLoadIncidentsTypes();
            }
          })
        })
        .catch(rej => {
          Swal.fire({
            icon:'error',
            title:'Error!',
            text:'Hubo un problema al intentar eliminar el tipo de incidencia.'
          })
        })
      }
    })
  }
  fnNew(){
    this.newForm.reset();
    this.currentView = 0;
    this.fnOpenModal();
  }

  onSubmitNew(){
    let data = {
      name:this.newForm.value.name
    }
    this.incidentTypeService.fnPostNewIncidentType(data)
    .then(res => {
      Swal.fire({
        icon:'success',
        title:'Correcto!',
        text:'Se agrego correctamente el tipo de incidencia',
        didClose: () => {
          this.fnLoadIncidentsTypes();
          this.fnCloseModal();
        }
      })
    })
    .catch(rej => {
      Swal.fire({
        icon:'error',
        title:'Error!',
        text:'Hubo un problema al intentar agregar el nuevo tipo de incidencia'
      })
    })
  }
  onSubmitEdit(){
    let data = {
      name:(this.newForm.value.name == undefined)?this.currentIncidentType : this.newForm.value.name,
      id:this.currentIncidentType.id
    }
    this.incidentTypeService.fnPuteditIncidentType(data)
    .then(res => {
      Swal.fire({
        icon:'success',
        title:'Correcto!',
        text:'Se agrego correctamente el tipo de incidencia',
        didClose: () => {
          this.fnLoadIncidentsTypes();
          this.fnCloseModal();
        }
      })
    })
    .catch(rej => {
      Swal.fire({
        icon:'error',
        title:'Error!',
        text:'Hubo un problema al intentar agregar el nuevo tipo de incidencia'
      })
    })
  }

}
