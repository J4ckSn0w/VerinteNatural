import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HarvestService } from '../../services/harvest.service';
import { NgbModal, ModalDismissReasons, NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DriverService } from '../../services/driver.service';
import { ProductService } from '../../services/product.service';
import { NgbDateStructAdapter } from '@ng-bootstrap/ng-bootstrap/datepicker/adapters/ngb-date-adapter';
import { ProviderService } from '../../services/provider.service';

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
    private driverService: DriverService,
    private productService: ProductService,
    private calendar: NgbCalendar,
    private providerService:ProviderService
  ) { }

  arrayGeneralRecolecctions = [];

  arrayOrderRecollection = [];

  arrayDrivers = [];

  firstDate : NgbDate;
  lastDate: NgbDateStruct;

  errorAddress = false;//'Debe escribir una direccion.';
  errorRetriever = false;//'Debe seleccionar un recolector.';
  errorDate = false;//'Debe seleccionar una fecha valida.';
  errorProducts = false;//'La lista de productos no puede estar vacia.'

  currentGeneralRecolection = {
    folio:'',
    id:'',
    products:[],
    provider_id:'',
    requisition_id:'',
    employee_id:'',
    address:''
  }

  currentProvider = {
    address:''
  }

  newDate;
  minDate = {};

  ngOnInit(): void {
    this.fnLoadGeneralRecolections();
    this.newDate = new Date();
    this.minDate = this.calendar.getToday();
  }

  fnLoadOrderProducts(){
    this.arrayOrderRecollection = [];
    this.currentGeneralRecolection.products.forEach(element => {
      //if(element.to_collect != 0)
      if(element.to_collect == 0)
      {
        this.arrayOrderRecollection.push({
          id:element.id,
          name:element.name,
          SKU:element.SKU,
          to_collect:element.to_collect,
          was_finalized:element.was_finalized
        });
      }
    });
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
    .catch(rej => {
      console.log('Error al cargar las recolecciones generales');
      console.log(rej);
    })
  }

  fnLoadGenerlRecolection(id){
    this.harvestSevice.fnGetHarvestById(id)
    .then(res => {
      console.log('General Recolection');
      console.log(res);
      this.currentGeneralRecolection = res.data;
      //this.arrayGeneralRecolecctions = [];
      //this.fnLoadOrderProducts();
      this.providerService.fnGetProviderById(this.currentGeneralRecolection.provider_id)
      .then(res => {
        this.currentProvider = res.data;
        this.currentGeneralRecolection.address = this.currentProvider.address;
        this.fnOpenModal();
      })
      .catch(rej => {
        console.log('Error al cargar proveedor');
        console.log(rej);
      })
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

  fnCreateGeneralRecolectionOrder(){
    //this.error = '';
    this.errorAddress = false;
    this.errorDate = false;
    this.errorProducts = false;
    this.errorRetriever = false;
    console.log(this.calendar.getToday());
    this.lastDate = this.calendar.getToday();
    if(this.arrayOrderRecollection.length == 0)
    {
      //this.error = 'La lista de productos en la orden de recoleccion no puede estar vacia!'
      this.errorProducts = true;
    }
    if(this.currentGeneralRecolection.employee_id == '' || this.currentGeneralRecolection.employee_id == undefined){
      //this.error = 'Seleccione un recolector.'
      this.errorRetriever = true;
    }
    if(this.firstDate == undefined || this.firstDate == null || this.fnCheckDates()){
      //this.error = 'Seleccione una fecha para la recoleccion.'
      this.errorDate = true;
    }
    if(this.currentGeneralRecolection.address == "" || this.currentGeneralRecolection.address == undefined){
      this.errorAddress = true;
    }

    let data = {

    }

    return;
  }

  fnCheckDates(){
    if(this.lastDate.year > this.firstDate.year){
      console.log('Año menor');
      return true;
    }
    else{
      if(this.lastDate.month > this.firstDate.month){
        console.log('Mes menor');
        return true;
      }
      else{
        if((this.lastDate.day > this.firstDate.day) && this.lastDate.month == this.firstDate.month){
          console.log('Dia es menor');
          return true;
        }
      }
    }
  }

  fnDeleteOrderProduct(id){
    for(var i = 0 ; i < this.arrayOrderRecollection.length; i ++ ){
      if( this.arrayOrderRecollection[i].id == id){
        this.arrayOrderRecollection.splice(i,1);
        i--;
      }
    }
  }

  fnAddOrderProduct(id){
    console.log('EL ID');
    console.log(id);
    // this.arrayOrderRecollection.forEach(element => {
    //   console.log('Elemento');
    //     console.log(element);
    //   if(element.id == id){
    //     console.log('ENTRE');
    //     return;
    //   }
    // });
    for(var i = 0; i < this.arrayOrderRecollection.length; i ++){
      if(this.arrayOrderRecollection[i].id == id){
        return;
      }
    }
    this.productService.fnGetProductById(id)
    .then(res => {
      this.arrayOrderRecollection.push(res.data);
    })
    .catch(rej => {
      console.log('Error al agregar el producto');
      console.log(rej);
    })
  }

}
