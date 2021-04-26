import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from './../../services/product.service';
import { RequisitionService } from '../../services/requisitions.service';
import { NgbDateStructAdapter } from '@ng-bootstrap/ng-bootstrap/datepicker/adapters/ngb-date-adapter';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-requisitions',
  templateUrl: './requisitions.component.html',
  styleUrls: ['./requisitions.component.css']
})
export class RequisitionsComponent implements OnInit {

  /*Modal Inicio*/
  newForm = new FormGroup({
    date: new FormControl(null,[Validators.required]),
    quantity: new FormControl(null,[Validators.required])
  });

  currentView = 0;
  arrayViewsNames = ['Nueva solicitud de compra','Editar solicitud de compra','Info solicitud de compra'];

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

  /**Modal Final */

  firstDate : NgbDateStruct;

  arrayRequisitions = [];

  arrayRequisitionProducts = [];

  currentRequisition = {
    id:'',
    products:[]
  }

  constructor(
    private modalService: NgbModal,
    private productService: ProductService,
    private requisitionService: RequisitionService
  ) { }

  ngOnInit(): void {
    this.fnLoadProducts();
    this.fnLoadRequisitions();
  }

  fnLoadRequisitions(){
    this.arrayRequisitions = [];
    this.requisitionService.fnGetAllRequisition()
    .then(res => {
      res.data.forEach(element => {
        this.arrayRequisitions.push(element);
      })
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
      console.log('Date');
      let first = res.data.created_at.split('-');
      let last = first[2].split('T');
      this.firstDate = { year:Number(first[0]), month:Number(first[1]), day: Number(last[0])};
      console.log(this.firstDate);
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
    return this.firstDate.year + '-' + (this.firstDate.month < 10 ? ('0') : '') + this.firstDate.month + '-' + this.firstDate.day;
    //return ''+date.year + '-'+((date.month <10 )? +('0'):'' )+date.month +'-'+ (date.day < 10) ? +('0'):'' + date.day;
  }

  onSubmitEdit(){
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
    let data = {
      required_to:this.fnDateFormat(this.firstDate),
      products:this.arrayOrderProducts
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
      console.log('ALGO SALIO MAL');
      console.log(rej);
    })
  }

  currentProduct = {
    id:'',
    quantity:'',
    name:''
  }

  arrayProducts = [];

  arrayOrderProducts = [];

  fnDeleteProduct(id){
    console.log('Entre aqui');
    console.log(this.arrayOrderProducts.length);
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
  }

  onOptionsSelected(event){
    console.log(event); //option value will be sent as event
    this.currentProduct.id = event;
   }

   fnAddProduct(){
     //let data = this.arrayProducts[this.currentProduct.id];
    let data = this.arrayProducts.find(element => element.id == this.currentProduct.id);

    console.log('AL CONSULTAR');
    console.log(data);

    console.log(data);
    if(this.currentProduct.id == undefined || this.newForm.value.quantity == undefined || data == undefined){
      return;
    }
    let newProduct = {
      id:this.currentProduct.id,
      quantity:this.newForm.value.quantity,
      name:data.name
    }

    console.log('Nuevo producto');
    console.log(newProduct);
    this.arrayOrderProducts.push(newProduct);

    this.newForm.value.quantity = '';
    
    //console.log(this.arrayOrderProducts);

    /*Delete option of new product */
    
    this.fnCheckRemainingProducts();
    
    /*
    this.currentProduct = {
      id:'',
      quantity:'',
      name:''
    };*/
   }

   fnCheckRemainingProducts(){

    //console.log('Array de la orden');
    //console.log(this.arrayOrderProducts);
    //console.log(this.arrayOrderProducts.length);
    // console.log('Array de productos');
    // console.log(this.arrayProducts);
    // console.log(this.arrayProducts.length);

    //console.log('Antes de entrar a los dos for');
    //return;
    for(var i = 0 ; i < this.arrayOrderProducts.length; i ++ ){
      //console.log('PRIMER FOR');
      for(var j = 0; j < this.arrayProducts.length; j ++){
        //console.log('Order: ' + this.arrayOrderProducts[i].id + 'Products: '+this.arrayProducts[j].id);
        if( this.arrayOrderProducts[i].id == this.arrayProducts[j].id){
          this.arrayProducts.splice(j,1);
          j--;
          //console.log('ENTRE');
        }
      }
    }
   }
}
