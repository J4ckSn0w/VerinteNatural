import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HarvestService } from '../../services/harvest.service';
import { NgbModal, ModalDismissReasons, NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DriverService } from '../../services/driver.service';
import { ProductService } from '../../services/product.service';
import { NgbDateStructAdapter } from '@ng-bootstrap/ng-bootstrap/datepicker/adapters/ngb-date-adapter';
import { ProviderService } from '../../services/provider.service';
import { UnitService } from '../../services/unit.service';
import Swal from 'sweetalert2';

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
    private providerService:ProviderService,
    private unitService:UnitService
  ) { }

  arrayGeneralRecolecctions = [];

  arrayOrderRecollection = [];

  arrayDrivers = [];

  arrayUnits = [];

  firstDate : NgbDate;
  lastDate: NgbDateStruct;

  startTime;

  errorAddress = false;//'Debe escribir una direccion.';
  errorRetriever = false;//'Debe seleccionar un recolector.';
  errorDate = false;//'Debe seleccionar una fecha valida.';
  errorProducts = false;//'La lista de productos no puede estar vacia.'
  errorTime = false;
  errorQuantity = false;

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
    address:'',
    contact_name:'',
    payment_form_id:''
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

  fnLoadUnits(){
    this.arrayUnits = [];
    this.unitService.fnGetUnits()
    .then(res => {
      res.data.forEach(element => {
        this.arrayUnits.push(element);
      });
    })
  }

  fnVer(id){}
  fnEdit(id){}
  fnDelete(id){}
  fnNew(harvest_id){
    this.currentView = 0;
    this.show = false;
    this.fnErrorsToFalse();
    //this.fnOpenModal();
    this.fnLoadGenerlRecolection(harvest_id);
    this.fnLoadDrivers();
    this.fnLoadUnits();
  }

  fnCreateGeneralRecolectionOrder(){
    //this.error = '';
    // this.errorAddress = false;
    // this.errorDate = false;
    // this.errorProducts = false;
    // this.errorRetriever = false;
    // this.errorTime = false;
    this.fnErrorsToFalse();
    // console.log(this.calendar.getToday());
    this.lastDate = this.calendar.getToday();
    if(this.arrayOrderRecollection.length == 0)
    {
      this.errorProducts = true;
      //return;
    }
    if(this.currentGeneralRecolection.employee_id == '' || this.currentGeneralRecolection.employee_id == undefined){
      //this.error = 'Seleccione un recolector.'
      this.errorRetriever = true;
      console.log('Entre a error recolector');
      //return;
    }
    if(this.firstDate == undefined || this.firstDate == null || this.fnCheckDates()){
      //this.error = 'Seleccione una fecha para la recoleccion.'
      console.log('Entre a error fecha');
      this.errorDate = true;
      //return;
    }
    if(this.currentGeneralRecolection.address == "" || this.currentGeneralRecolection.address == undefined){
      this.errorAddress = true;
      //return;
    }
    this.arrayOrderRecollection.forEach(element => {
      if(element.quantity == "" || element.quantity == 0 || !element.quantity){
        this.errorProducts = true;
      }
    });
    if(this.startTime == undefined || this.startTime == null){
      this.errorTime = true;
      //return;
    }
    this.fnErrorsProduct();

    if(this.errorProducts)
      return;
    if(this.errorProducts || this.errorRetriever || this.errorTime || this.errorDate || this.errorAddress || this.errorQuantity)
      return;

    // console.log(this.arrayOrderRecollection);

    // console.log('Fecha');
    // console.log(this.firstDate);

    // console.log('Recolector');
    // console.log(this.currentGeneralRecolection.employee_id);

    // console.log('Tiempo');
    // console.log(this.startTime);

    if(!this.fnCheckTime()){
      this.errorTime = true;
      return;
    }

    this.fnChangeProductsToCreate();

    let data = {
      address:this.currentProvider.address,
      contact_name:this.currentProvider.contact_name,
      employee_id:this.currentGeneralRecolection.employee_id,
      collect_to:this.fnDateFormat(this.firstDate) + ' ' + this.fnTimeFormat(),
      harvest_id:this.currentGeneralRecolection.id,
      payment_form_id:this.currentProvider.payment_form_id,
      products:this.arrayOrderRecollection
    }
    console.log('Ando aca xd');
    console.log(data);

    this.harvestSevice.fnPostNewHarvest(data)
    .then(res => {
      Swal.fire({
        icon:'success',
        title:'Correcto!',
        text:'Se creo la orden de recoleccion correctamente',
        didClose:() => {
          this.fnLoadGeneralRecolections();
          this.fnCloseModal();
        }
      })
    })
    .catch(rej => {
      console.log('Error al intentar crear la orden de recoleccion');
      console.log(rej);
    })
  }

  fnDateFormat(date){
    return this.firstDate.year + '-' + (this.firstDate.month < 10 ? ('0') : '') + this.firstDate.month + '-' + (this.firstDate.day > 10 ? '' : '0') + this.firstDate.day;
    //return ''+date.year + '-'+((date.month <10 )? +('0'):'' )+date.month +'-'+ (date.day < 10) ? +('0'):'' + date.day;
  }

  fnTimeFormat(){
    return (this.startTime.hour < 10 ? '0' : '') + this.startTime.hour + ':'+
    (this.startTime.minute < 10 ? '0' : '') + this.startTime.minute;
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
  
  fnCheckTime(){
    var time = new Date();
    
    var timeFormated = {
      hour:time.getHours(),
      minute:time.getMinutes()
    }
    console.log('Mio');
    console.log(timeFormated);

    let currentTime =  time.toLocaleString('en-US', { hour: 'numeric' })
    console.log(currentTime);
    console.log('Formateada');
    console.log(this.fnformatAMPM(time));
    if(this.lastDate.year == this.firstDate.year &&
      this.lastDate.month == this.firstDate.month &&
      this.lastDate.day == this.firstDate.day){
        console.log('EL DIA ES HOY!!');
        if(this.startTime.hour <= timeFormated.hour && this.startTime.minute < timeFormated.minute)
          return false;
        //else if(this.startTime == timeFormated.hour && this.startTime)
        return true;
      }
      else {
      return true;
    }
  }

  fnformatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
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
    let newProduct;
    for(var i = 0 ; i < this.currentGeneralRecolection.products.length; i ++ ){
      if( this.currentGeneralRecolection.products[i].id == id){
        newProduct = this.currentGeneralRecolection.products[i];
      }
    }

    this.arrayOrderRecollection.push({
      id:newProduct.id,
      inventory_sku:newProduct.inventory_sku,
      name:newProduct.name,
      quantity:newProduct.quantity,
      sku:newProduct.sku,
      to_collect:newProduct.to_collect,
      unit_id:newProduct.unit_id,
      was_finalized:newProduct.was_finalized,
      new_quantity:''
    });

    // this.productService.fnGetProductById(id)
    // .then(res => {
    //   this.arrayOrderRecollection.push(res.data);
    // })
    // .catch(rej => {
    //   console.log('Error al agregar el producto');
    //   console.log(rej);
    // });
  }

  /*Errors to false */
  fnErrorsToFalse(){
    this.errorAddress = false;
    this.errorDate = false;
    this.errorProducts = false;
    this.errorRetriever = false;
    this.errorTime = false;
    this.errorQuantity = false;
  }
  /*Errores de cantidades */
  fnErrorsProduct(){
    this.errorQuantity = false;
    console.log('Entre aqui.');
    console.log(this.arrayOrderRecollection);
    this.arrayOrderRecollection.forEach(element => {
      if(Number(element.new_quantity) > Number(element.to_collect)){
        this.errorQuantity = true;
        console.log('Entre al error de producto');
        return;
      }
    })
  }

  /*Cambia productos para mandarlos*/
  fnChangeProductsToCreate(){
    this.arrayOrderRecollection.forEach(element => {
      element.quantity = element.new_quantity
    });
  }

}
