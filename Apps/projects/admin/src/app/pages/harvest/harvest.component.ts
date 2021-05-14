import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HarvestService } from '../../services/harvest.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DriverService } from '../../services/driver.service';

@Component({
  selector: 'app-harvest',
  templateUrl: './harvest.component.html',
  styleUrls: ['./harvest.component.css']
})
export class HarvestComponent implements OnInit {

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
    this.modalService.open(this.myModal,{size:'lg'}).result.then((result) => {

    },(reason) => {
      this.getDismissReason(reason);
    })
  }

  @ViewChild('myModal') myModal:ElementRef;

  tableLoad = false;

  /**Modal Final */

  constructor(
    private harvestSevice:HarvestService,
    private modalService: NgbModal,
    private driverService: DriverService
  ) { }

  arrayGeneralRecolecctions = [];

  arrayDrivers = [];

  firstDate = [];

  currentGeneralRecolection = {
    folio:'',
    id:'',
    products:[],
    provider_id:'',
    requisition_id:'',
    employee_id:'',
    address:''
  }

  ngOnInit(): void {
    this.fnLoadGeneralRecolections();
  }

  fnLoadGeneralRecolections(){
    this.harvestSevice.fnGetHarvests()
    .then(res => {
      res.data.forEach(element => {
        this.arrayGeneralRecolecctions.push(element);
      });
      this.tableLoad = true;
      console.log('Data');
      console.log(this.arrayGeneralRecolecctions);
    })
  }

  fnLoadGenerlRecolection(id){
    this.harvestSevice.fnGetHarvestById(id)
    .then(res => {
      console.log('General Recolection');
      console.log(res);
      this.currentGeneralRecolection = res.data;
      this.fnOpenModal();
    })
  }

  fnLoadDrivers(){
    this.arrayDrivers = [];
    this.driverService.fnGetGatheres()
    .then(res =>{ 
      res.data.forEach(element => {
        this.arrayDrivers.push(element);
      });
      console.log('Drivers');
      console.log(this.arrayDrivers);
    })
  }

  fnVer(id){}
  fnEdit(id){}
  fnDelete(id){}
  fnNew(harvest_id){
    this.currentView = 0;
    this.show = false;
    //this.fnOpenModal();
    this.fnLoadGenerlRecolection(harvest_id);
    this.fnLoadDrivers();
  }

  fnCreateGeneralRecolectionOrder(){}

}
