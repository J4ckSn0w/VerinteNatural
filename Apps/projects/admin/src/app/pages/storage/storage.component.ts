import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent implements OnInit {

  /*Modal Inicio*/
  newForm = new FormGroup({
    subject: new FormControl(null,[Validators.required]),
    description: new FormControl(null,[Validators.required]),
    incident_type_id: new FormControl(null,[Validators.required])
  });

  currentView = 0;
  arrayViewsNames = ['Nueva orden de recoleccion','Editar reporte','Info reporte'];

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
    this.modalService.open(this.myModal,{size:'xl'}).result.then((result) => {

    },(reason) => {
      this.getDismissReason(reason);
    })
  }

  @ViewChild('myModal') myModal:ElementRef;

  tableLoad = false;


  /**Modal Final */

  constructor(
    private modalService: NgbModal,
    private storageService:StorageService
  ) { }

  arrayStorageOrders = [];

  currentStorageOrder = {
    folio:'',
    employee_id:'',
    employee_name:'',
    gatherer_name:'',
    harvest_sheet_id:'',
    id:'',
    products:[]
  }

  ngOnInit(): void {
    this.fnLoadStorageOrders();
  }

  fnLoadStorageOrders(){
    this.tableLoad = false;
    this.storageService.fnGetStorageOrders()
    .then(res => {
      res.data.forEach(element => {
        this.arrayStorageOrders.push(element);
      });
      console.log('Data');
      console.log(this.arrayStorageOrders);
      this.tableLoad = true;
    })
  }

  fnLoadStorageOrder(id){
    this.storageService.fnGetStorageOrderById(id)
    .then(res => {
      this.currentStorageOrder = res.data;
      console.log('My data');
      console.log(this.currentStorageOrder);
    })
    .catch(rej => {
      console.log('Error traer orden');
      console.log(rej);
    });
  }

  fnVer(id){
    this.currentView = 0;
    this.fnLoadStorageOrder(id);
    this.fnOpenModal();
  }

  onSubmit(){}

}
