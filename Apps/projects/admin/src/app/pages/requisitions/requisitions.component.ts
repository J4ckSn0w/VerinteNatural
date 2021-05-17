import { Component, OnInit, ViewChild, ElementRef, ɵclearResolutionOfComponentResourcesQueue } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from './../../services/product.service';
import { RequisitionService } from '../../services/requisitions.service';
import { NgbDateStructAdapter } from '@ng-bootstrap/ng-bootstrap/datepicker/adapters/ngb-date-adapter';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ProviderService } from '../../services/provider.service';
import { async } from '@angular/core/testing';
import { HarvestService } from '../../services/harvest.service';

@Component({
  selector: 'app-requisitions',
  templateUrl: './requisitions.component.html',
  styleUrls: ['./requisitions.component.css']
})
export class RequisitionsComponent implements OnInit {

  /*Modal Inicio*/
  newForm = new FormGroup({
    date: new FormControl(null,[Validators.required]),
    quantity: new FormControl(null),
    quantity_real : new FormControl(null),
    provider_id:new FormControl(null)
  });

  currentView = 0;
  arrayViewsNames = ['Nueva solicitud de compra','Editar solicitud de compra','Info solicitud de compra','Hoja de Recoleccion'];

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

  firstDate : NgbDateStruct;
  lastDate: NgbDateStruct;

  arrayRequisitions = [];

  arrayRequisitionProducts = [];

  currentRequisition = {
    id:'',
    products:[],
    status:0
  }

  errorProducts = false;
  errorDate = false;

  constructor(
    private modalService: NgbModal,
    private productService: ProductService,
    private requisitionService: RequisitionService,
    private router: Router,
    private providerService: ProviderService,
    private harvestService:HarvestService,
    private calendar: NgbCalendar
  ) { }

  ngOnInit(): void {
    this.fnLoadProducts();
    this.fnLoadRequisitions();

    /**Trying to set this to a variable to acces in callback functions */
  
    this.globalContext = this;
    this.minDate = this.calendar.getToday();

  }

  globalContext;

  fnLoadRequisitions(){
    this.tableLoad = false;
    this.arrayRequisitions = [];
    this.requisitionService.fnGetAllRequisition()
    .then(res => {
      res.data.forEach(element => {
        this.arrayRequisitions.push(element);
      });
      this.tableLoad = true;
      console.log(res);
    })
    .catch(rej => {
      console.log('Algo salio mal');
      console.log(rej);
    })
  }

  fnLoadRequisition(id){
    this.requisitionService.fnGetRequisitionById(id)
    .then(res => {
      this.currentRequisition = res.data;
      this.arrayOrderProducts = res.data.products;
      console.log(this.currentRequisition);
      //console.log('Date');
      let first = res.data.created_at.split('-');
      let last = first[2].split('T');
      this.firstDate = { year:Number(first[0]), month:Number(first[1]), day: Number(last[0])};
      //console.log(this.firstDate);
      this.fnUpdateGeneralProducts();//Solo para cantidades autorizadas al hacer hoja de recoleccion general
      this.fnCheckRemainingProducts();
    })
  }

  fnVer(id){
    this.show = true;
    this.currentView = 1;
    this.fnOpenModal();
    this.fnLoadRequisition(id);
  }

  fnEdit(id){
    this.show = false;
    this.currentView = 1;
    this.fnCheckRemainingProducts();
    this.fnLoadRequisition(id);
    this.fnCleanProducts();
    this.fnOpenModal();
  }

  fnNew(){
    this.newForm.reset();
    this.currentView = 0;
    this.show = false;
    this.fnCleanProducts();
    this.fnOpenModal();
  }

  fnCleanProducts(){
    this.arrayOrderProducts = [];
    this.fnLoadProducts();
  }

  fnDelete(id){
    Swal.fire({
      icon:'warning',
      title:'Eliminar Solicitud.',
      text:'Desea eliminar la solicitud de mercancia?',
      showDenyButton:true,
      denyButtonText:'Si',
      confirmButtonText:'No'
    }).then(result => {
      if(result.isDenied){
        this.requisitionService.fnDeleteRequisition(id)
        .then(res => {
          Swal.fire({
            icon:'success',
            title:'Correcto!',
            text:'Se elimino la solicitud de mercancia correctamente',
            didClose:() =>{
              this.fnLoadRequisitions();
            }
          })
        })
        .catch(rej => {
          Swal.fire({
            icon:'error',
            title:'Error!',
            text:'Hubo un error al intentar eliminar la solicitud de mercancia'
          })
        });
      }
    })
  }

  fnLoadProducts(){
    this.arrayProducts = [];
    //this.arrayRequisitions = [];
    this.productService.fnGetProducts()
    .then(res => {
      res.data.forEach(element => {
        this.arrayProducts.push(element);
        //console.log('ELEMENT');
        //console.log(element);
      })
      this.fnCheckRemainingProducts();
      //console.log('Respuesta');
      //console.log(res.data);
    })
    
  }

  fnDateFormat(date){
    return this.firstDate.year + '-' + (this.firstDate.month < 10 ? ('0') : '') + this.firstDate.month + '-' + (this.firstDate.day > 10 ? '' : '0') + this.firstDate.day;
    //return ''+date.year + '-'+((date.month <10 )? +('0'):'' )+date.month +'-'+ (date.day < 10) ? +('0'):'' + date.day;
  }

  onSubmitEdit(){
    this.errorProducts = false;
    this.errorDate = false;
    let data = {
      required_to:this.fnDateFormat(this.firstDate),
      products:this.arrayOrderProducts,
      id:this.currentRequisition.id
    };
    console.log('Data');
    console.log(data);
    console.log(this.currentRequisition);

    this.requisitionService.fnUpdateRequisition(data)
    .then(res => {
      Swal.fire({
        icon:'success',
        title:'Correcto',
        text:'Se edito correctamente la solicitud de mercancia',
        didClose:() => {
          //this.fnLoadProducts();
          this.fnCloseModal();
          this.fnLoadRequisitions();
        }
      })
    })
    .catch(rej => {
      Swal.fire({
        icon:'error',
        title:'Error!',
        text:'Hubo un error al intentar editar la solicitud de mercancia'
      })
      console.log('ERROR');
      console.log(rej);
    });
  }

  onSubmitNew(){
    this.errorProducts = false;
    this.errorDate = false;
    this.lastDate = this.calendar.getToday();
    if(this.fnCheckDates() == true){
      console.log('Fecha erronea');
      return;
    }
    let data = {
      required_to:this.fnDateFormat(this.firstDate),
      products:this.arrayOrderProducts
    }
    console.log('Length');
    console.log(this.arrayOrderProducts.length);
    if(this.arrayOrderProducts.length <= 0){
      this.errorProducts = true;
      return;
    }

    console.log(this.firstDate);
    console.log('FECHA');
    console.log(data.required_to);

    this.requisitionService.fnPostNewRequisition(data)
    .then(res => {
      Swal.fire({
        icon:'success',
        title:'Correcto!',
        text:'Se creo la solicitud de mercancia correctamente',
        didClose: () => {
          this.fnLoadRequisitions();
          this.fnCloseModal();
        }
      })
    })
    .catch(rej => {
      Swal.fire({
        icon:'error',
        title:'Error!',
        text:'Algo salio mal al intentar crear la nueva solicitud.'
      })
      console.log('ALGO SALIO MAL');
      console.log(rej);
    });
  }

  currentProduct = {
    id:'',
    quantity:'',
    name:'',
    provider_id:'',
    quantity_real:''
  }

  arrayProducts = [];

  arrayOrderProducts = [];

  minDate = {};

  fnDeleteProduct(id){
    //console.log('Entre aqui');
    //console.log(this.arrayOrderProducts.length);
    //this.arrayProviderProducts.splice(id);
    //delete this.arrayProviderProducts[id];
    for(var i = 0 ; i < this.arrayOrderProducts.length; i ++ ){
      if( this.arrayOrderProducts[i].id == id){
        this.arrayOrderProducts.splice(i,1);
        i--;
      }
    }
    //console.log('Despues');
    //console.log(this.arrayOrderProducts.length);
    this.fnLoadProducts();
    this.fnCheckRemainingProducts()

    //CALANDO CON CANTIDAD AUTORIZADA
    /*
    for(var i = 0 ; i < this.arrayGeneralProduct.length; i ++ ){
      if( this.arrayGeneralProduct[i].id == id){
        this.arrayGeneralProduct.splice(i,1);
        i--;
      }
    }*/
  }

  onOptionsSelected(event){
    console.log(event); //option value will be sent as event
    this.currentProduct.id = event;
   }

   fnAddProduct(){
     //let data = this.arrayProducts[this.currentProduct.id];
    let data = this.arrayProducts.find(element => element.id == this.currentProduct.id);

    //console.log('AL CONSULTAR');
    //console.log(data);

    //console.log(data);
    if(this.currentProduct.id == undefined || this.newForm.value.quantity == undefined || data == undefined){
      return;
    }
    let newProduct = {
      id:this.currentProduct.id,
      quantity:this.newForm.value.quantity,
      name:data.name
    }

    // console.log('Nuevo producto');
    // console.log(newProduct);

    console.log('Antes de agregar producto en arrayOrderProduct');
    console.log(this.arrayOrderProducts);

    this.arrayOrderProducts.push(newProduct);

    /*Limpia el valor de cantidad */
    this.newForm.value.quantity = '';
    this.newForm.controls['quantity'].setValue('');
    
    //console.log(this.arrayOrderProducts);
    //CALANDO CON CANTIDAD AUTORIZZADA
    /*
    let otherProduct = {
      id:newProduct.id,
      quantity:'',
      provider_id:''
    }

    this.arrayGeneralProduct.push(otherProduct);*/

    this.fnCheckRemainingProducts();
   }

   fnCheckRemainingProducts(){
    for(var i = 0 ; i < this.arrayOrderProducts.length; i ++ ){
      for(var j = 0; j < this.arrayProducts.length; j ++){
        if( this.arrayOrderProducts[i].id == this.arrayProducts[j].id){
          this.arrayProducts.splice(j,1);
          j--;
        }
      }
    }
   }

   fnChangheStatus(id){
     Swal.fire({
       icon:'info',
       title:'Cambiar Status',
       text:'Cambiar status de la solicitud de mercancia',
       showDenyButton:true,
       denyButtonText:'Rechazar',
       confirmButtonText:'Acceptar'
     }).then(result => {
       if(result.isConfirmed){
         this.changeStatus(id,2);
       }
       else if(result.isDenied){
         this.changeStatus(id,3);
       }
     })
   }

   changeStatus(id,status){
    this.requisitionService.fnPutChangeStatusRequisition(id,status)
    .then(res => {
      if(status != 2){
        Swal.fire({
          icon:'success',
          title:'Correcto!',
          text:'Se cambio el status de la solicitud correctamente',
          didClose:() => {
            this.fnLoadRequisitions();
          }
        })
      }
    })
    .catch(rej => {
      if(status != 2){
        Swal.fire({
          icon:'error',
          title:'Error!',
          text:'Hubo un error al intentar cambiar el status de la solicitud de mercancia'
        })
      }
      console.log('Error');
      console.log(rej);
    })
   }

   /* Check para ventas en cada hoja de requerimientos */
   fnCheckRequisition(id){
     Swal.fire({
       icon:'question',
       title:'Aprobar Hoja',
       text:'Desea aprobar esta hoja de requerimientos?',
       confirmButtonText:'Confirmar.'
     }).then(result => {
       if(result.isConfirmed)
       {
         this.requisitionService.fnPutChangeStatusRequisition(id,1)
         .then(res => {
           Swal.fire({
             icon:'success',
             title:'Correcto',
             text:'Se confirmo la hoja de requerimientos correctamente',
             didClose:() => {
               this.fnLoadRequisitions();
             }
           })
         })
         .catch(rej => {
           Swal.fire({
             icon:'error',
             title:'Error!',
             text:'Algo salio mal al intentar confirmar la hoja de requerimientos',
           })
           console.log('Error');
           console.log(rej);
         })
       }
     })
   }

   /*Generar hoja de recoleccion*/
   fnGenerateCollectionOrder(id){
 
    this.fnLoadProviders();
    this.currentView = 3;
    this.show = false;
    this.fnLoadRequisition(id);    
    return;

     console.log('id');
     console.log(id);
     this.requisitionService.fnGetRequisitionById(id)
     .then(res => {
       this.currentRequisition = res.data;
     })
     .catch(rej => {
       console.log('Error al traer la informacion de requisition');
       console.log(rej);
     })
     console.log('Current Requisition');
     console.log(this.currentRequisition);
     console.log('Status');
     console.log(this.currentRequisition.status);
     if(this.currentRequisition.status != 2){
       Swal.fire({
         icon:'error',
         title:'Error!',
         text:'No puede crear una hoja de recoleccion de esta hoja de requerimientos, hasta ser aceptada por compras.'
       });
       return;
     }
     this.router.navigate(["/admin/purchase",id]);
   }

   /*Hoja general de recoleccion */

   errorGeneralProduct = '';

   arrayProviders = [];

   fnLoadProviders(){
     this.arrayProviders = [];
     this.providerService.fnGetProvidersWithProducts()
     .then(res => {
       res.data.forEach(element => {
         this.arrayProviders.push(element);
       });
       console.log('Array en res');
       console.log(this.arrayProviders)
       this.fnOpenModal();
     })
   }

   fnLoadProvider(id){
     this.providerService.fnGetProviderById(id)
     .then(res => {
       return res.data;
     })
     .catch(rej => {
       console.log('Algo salio mal al traer al proveedor');
       console.log(rej);
     })
   }

   fnProviderContainsProduct(id,elemento){
     console.log('Elemento');
     console.log(elemento);
     console.log('ID');
     console.log(id);

     let provider = this.fnLoadProvider(elemento.id);
     return elemento;
      /*
     if(provider.products.include(id))
     {
       return elemento;
     }
     else{
       return null;
     }*/
   }

   fnFilterProvidersByProductId(product_id){
     let newArray = [];
    //  console.log('Providers');
    //  console.log(this.arrayProviders[1].products);
     this.arrayProviders.forEach(element => {
       if(element.products.hasOwnProperty(product_id))
       {
         newArray.push(element);
       }
     });
     return newArray;
   }

   arrayGeneralProduct = [];

   fnCreateGeneralRecolectionOrder(){
     let newProductsArray = [];
     this.errorGeneralProduct = '';
     console.log('Orden de recoleccion general');
     console.log(this.currentRequisition);
     console.log('ArrayGeneralProducts');
     console.log(this.arrayGeneralProduct);
     if(this.arrayGeneralProduct.length == 0){
       //error
       this.errorGeneralProduct = 'No puede crear una orden de recoleccion general sin productos!'
     }
     this.arrayGeneralProduct.forEach(element => {
       if(element.quantity_real == undefined || element.quantity_real == 0 || element.quantity_real == ""
       || element.provider_id == 0 || element.provider_id == "" || element.provider_id == undefined)
       {
         //error
         this.errorGeneralProduct = 'Favor de llenar todos los campos necesarios.'
       }
       else{
         newProductsArray.push({
          id:element.id,
          quantity_real:'',
          provider_id:element.provider_id,
          name:element.name,
          quantity:element.quantity_real
        });
       }
     });
     let data = {
       requisition_id:this.currentRequisition.id,
       products:newProductsArray
     }
     console.log('Data');
     console.log(data);

     this.harvestService.fnPostNewHarvest(data)
     .then(res => {
       Swal.fire({
         icon:'success',
         title:'Correcto',
         text:'Se creo la hoja de recoleccion general',
         didClose:() => {
          this.changeStatus(this.currentRequisition.id,2);
          this.fnCloseModal();
         }
       })
     })
     .catch(rej => {
       Swal.fire({
         icon:'error',
         title:'Error!',
         text:'Ocurrion un error al intentar crear la hoja de recoleccion general'
       })
     })
   }

   fnUpdateGeneralProducts(){
     console.log('Entre a update general product');
     this.arrayGeneralProduct = [];
     if(this.arrayOrderProducts.length > 0)
     {
       if(this.arrayGeneralProduct.length == 0 ){
        this.arrayOrderProducts.forEach(element => {
          this.arrayGeneralProduct.push({
            id:element.id,
            quantity_real:'',
            provider_id:'',
            name:element.name,
            quantity:element.quantity
          });
        });
        console.log('Tamaño de productos orden general');
        console.log(this.arrayGeneralProduct.length);
        console.log(this.arrayGeneralProduct);
       }
       else
       {
         
       }
     }
     else
     {
       this.arrayGeneralProduct = [];
     }
   }

   fnAddProductToGeneral ()
   {
     console.log('Entre a ProductGeneral');
    let data = this.arrayProducts.find(element => element.id == this.currentProduct.id);
    //if(this.currentProduct.id == undefined || this.newForm.value.quantity == undefined || data == undefined){
    if(this.currentProduct.id == undefined || this.currentProduct.quantity == undefined || data == undefined){
      console.log('Entre a aquijujujuju');
      console.log(this.currentProduct.id);
      console.log(this.newForm.value.quantity);
      console.log(data);
      return;
    }
    console.log('Aqui tambien');
    let newProduct = {
      id:Number(this.currentProduct.id),
      quantity:Number(this.currentProduct.quantity),
      name:data.name,
      quantity_real:Number(this.currentProduct.quantity),
      provider_id:Number(this.currentProduct.provider_id)
    }
    console.log('Ando aca');
    /**Probando auxiliar */
    //this.arrayGeneralProduct = this.arrayGeneralProduct;
    //let newArray = [...this.arrayGeneralProduct];
    let newArray = [];
    this.arrayGeneralProduct.forEach(element => {
       newArray.push({
         id:element.id,
         quantity:element.quantity,
         quantity_real:element.quantity_real,
         provider_id:element.provider_id,
         name:element.name
       });      
    });
    console.log('Antes de push');
    console.log(newArray);
    //setTimeout(() => { newArray.push(newProduct); console.log('Dentro del delay'); console.log(newArray);this.arrayGeneralProduct = newArray}, 1000);
    console.log('NewArray');
    console.log(newArray);

    /*Limpia el valor de cantidad */
    //this.newForm.value.quantity = '';
    //this.newForm.controls['quantity'].setValue('');
    this.currentProduct = {
      id:'',
      name:'',
      quantity:'',
      provider_id:'',
      quantity_real:''
    };
    newArray.push(newProduct); console.log('Dentro del delay'); 
    console.log(newArray);
    this.arrayGeneralProduct = newArray

    this.fnCheckRemainingProducts();
   }

   fnDeleteProductToGeneral(id){
    for(var i = 0 ; i < this.arrayGeneralProduct.length; i ++ ){
      if( this.arrayGeneralProduct[i].id == id){
        this.arrayGeneralProduct.splice(i,1);
        i--;
      }
    }
    this.fnLoadProducts();
    this.fnCheckRemainingProducts();
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
}
