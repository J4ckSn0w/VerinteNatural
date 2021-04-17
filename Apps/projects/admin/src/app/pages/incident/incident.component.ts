import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
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

  /**Modal Final */

  constructor(
    private incidentService: IncidentService,
    private modalService: NgbModal,
    private userService: UserService
  ) { }

  arrayIndicents = [];

  currentIncident = {
    subject:'',
    description:'',
    employee_id:''
  }

  currentEmployee;

  ngOnInit(): void {
    this.fnLoadIncidents();
    this.fnLoadEmployee();
  }

  fnLoadEmployee(){
    console.log('Entre a Load Employee');
    this.userService.fnGetUserByToken()
    .then(res => {
      this.currentEmployee = res;
      console.log('Simon');
      console.log(this.currentEmployee);
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
  fnEdit(id){}
  fnVer(id){}
  fnDelete(id){}
  fnLoadIncidents(){
    this.arrayIndicents = [];
    this.incidentService.fnGetIncidents()
    .then(res => {
      res.data.forEach(element => {
        this.arrayIndicents.push(element);
      });
      this.fnOpenModal();
    });
  }
  fnLoadIncident(id){}

  onSubmitNew(){
    let data = {
      subject:this.newForm.value.subject,
      description:this.newForm.value.description,
      //employee_id:this.currentEmployee.employee_id
      employee_id:this.currentEmployee.id
    };
    console.log('DATA');
    console.log(data);
    this.incidentService.fnPostNewIncident(data)
    .then(res => {
      console.log('Todo chido');
      console.log(res);
      this.fnLoadIncidents();
      this.fnCloseModal();
    })
  }
  onSubmitEdit(){}
}
