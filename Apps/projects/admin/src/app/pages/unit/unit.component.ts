import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UnitService } from '../../services/unit.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit {

  /*Modal Inicio*/
  newForm = new FormGroup({
    name: new FormControl(null,[Validators.required])
  });

  currentView = 0;
  arrayViewsNames = ['Nuevo producto','Editar producto','Info producto'];

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
    private unitService:UnitService,
    private modalService: NgbModal
  ) { }

  arrayUnits = [];

  currentUnit = {
    name:'',
    id:''
  }

  ngOnInit(): void {
    this.fnLoadUnits();
  }

  fnLoadUnits(){
    this.tableLoad = false;
    this.arrayUnits = [];
    this.unitService.fnGetUnits()
    .then(res => {
      res.data.forEach(element => {
        this.arrayUnits.push(element);
      });
      this.tableLoad = true;
      console.log(res);
    })
    .catch(rej => {
      console.log('Algo salio mal');
      console.log(rej);
    })
  }

  fnLoadUnit(id){
    this.unitService.fnGetUnitById(id)
    .then(res => {
      this.currentUnit = res.data;
    })
  }

  fnVer(id){
    this.currentView = 1;
    this.show = true;
    this.fnLoadUnit(id);
    this.fnOpenModal();
  }

  fnEdit(id){
    this.currentView = 1;
    this.show = false;
    this.fnLoadUnit(id);
    this.fnOpenModal();
  }

  fnNew(){
    this.currentView = 0;
    this.show = false;
    this.fnOpenModal();
  }

  fnDelete(id){
    Swal.fire({
      icon:'warning',
      title:'Eliminar?',
      text:'Desea eliminar esta unidad?',
      showDenyButton:true,
      denyButtonText:'Si',
      confirmButtonText:'No'
    }).then(result => {
      if(result.isDenied){
        this.unitService.fnDeleteUnit(id)
        .then(res => {
          Swal.fire({
            icon:'success',
            title:'Correcto',
            text:'Se elimino correctamente la unidad',
            didClose:() => {
              this.fnLoadUnits();
            }
          })
        })
        .catch(rej => {
          Swal.fire({
            icon:'error',
            title:'Error!',
            text:'Ocurrio un error al intentar eliminar la unidad'
          })
        })
      }
    })
  }

  onSubmitNew(){
    let data = {
      name:this.newForm.value.name
    }
    this.unitService.fnPostNewUnit(data)
    .then(res => {
      Swal.fire({
        icon:'success',
        title:'Correcto!',
        text:'Se agrego correctamente la nueva unidad',
        didClose:() => {
          this.fnLoadUnits();
          this.fnCloseModal();
        }
      })
    })
    .catch(rej => {
      Swal.fire({
        icon:'error',
        title:'Error!',
        text:'Ocurrio un error al intentar agregar la nueva unidad'
      })
      console.log('ERROR');
      console.log(rej);
    })
  }

  onSubmitEdit(){
    let data = {
      name:(this.newForm.value.name == undefined) ? this.currentUnit.name : this.newForm.value.name,
      id:this.currentUnit.id
    }

    this.unitService.fnEditUnit(data)
    .then(res => {
      Swal.fire({
        icon:'success',
        title:'Correcto',
        text:'Se edito la unidad correctamente',
        didClose:() => {
          this.fnLoadUnits();
          this.fnCloseModal();
        }
      })
    })
    .catch(rej => {
      Swal.fire({
        icon:'error',
        title:'Error!',
        text:'Ocurrio un error al intentar editar la unidad',        
      })
      console.log('Error');
      console.log(rej);
    })
  }

}
