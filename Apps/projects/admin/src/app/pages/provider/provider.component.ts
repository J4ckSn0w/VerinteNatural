import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ProviderService } from '../../services/provider.service';
import Swal from 'sweetalert2';
import { PaymentMethodService } from '../../services/payment_methos.service';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {

  /*Modal Inicio*/
  newForm = new FormGroup({
    name: new FormControl(null,[Validators.required]),
    email: new FormControl(null,[Validators.required]),
    phone_number: new FormControl(null,[Validators.required]),
    schedule: new FormControl(null,[Validators.required]),
    business_name: new FormControl(null,[Validators.required]),
    contact_job: new FormControl(null,[Validators.required]),
    contact_name: new FormControl(null,[Validators.required]),
    bank_account: new FormControl(null,[Validators.required]),
    bank: new FormControl(null,[Validators.required]),
    credit: new FormControl(null,[Validators.required]),
    max_purchase_allowed: new FormControl(null,[Validators.required]),
    is_producer: new FormControl(null,[Validators.required]),
    payment_form_id: new FormControl(null,[Validators.required])
  });

  currentView = 0;
  arrayViewsNames = ['Nuevo proveedor','Editar proveedor','Info proveedor'];

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
    private modalService: NgbModal,
    private productService: ProductService,
    private providerService: ProviderService,
    private paymentMethodsService: PaymentMethodService
  ) { }

  arrayProviders = [];

  arrayProducts = [];

  arrayProviderProducts = [];

  arrayPaymentForms = [];

  currentProduct = {
    id:'',
    name:'',
    price:''
  }

  currentProvider = {
    id:'',
    name: '',
    email: '',
    phone_number: '',
    contact: '',
    schedule: '',
    products:[],
    business_name:'',
    contact_job:'',
    contact_name:'',
    bank_account:'',
    bank:'',
    payment_form_id:'',
    credit:'',
    max_purchase_allowed:'',
    is_producer:false
  }

  priceError = false;
  idError = false;

  errors = {};

  ngOnInit(): void {
    this.fnLoadProviders();
    this.fnLoadPaymentMethods();
  }

  fnNew(){
    this.newForm.reset();
    this.arrayProviderProducts = [];
    this.currentView = 0;
    this.fnLoadProducts();
    this.fnOpenModal();
  }

  fnVer(id){
    this.show = true;
    this.fnLoadProviderInfo(id);
  }

  fnEdit(id){
    this.show = false;
    this.fnLoadProviderInfo(id);
  }

  fnDelete(id){
    Swal.fire({
      icon:'warning',
      title:'Eliminar',
      text:'Esta seguro de eliminar ese proveedor?',
      showDenyButton:true,
      denyButtonText:'Si',
      confirmButtonText:'No',
    }).then(result =>{
      if(result.isDenied){
        this.providerService.fnDeleteProvider(id)
        .then(res => {
          Swal.fire({
            icon:'success',
            title:'Correcto',
            text:'Se elimino el proveedor correctamene',
            didClose:() => {
              this.fnLoadProviders();
              this.fnCloseModal();
            }
          })
        })
      }
    })
  }

  fnDeleteProduct(id){
    console.log('Entre aqui');
    console.log(this.arrayProviderProducts.length);
    //this.arrayProviderProducts.splice(id);
    //delete this.arrayProviderProducts[id];
    for(var i = 0 ; i < this.arrayProviderProducts.length; i ++ ){
      if( this.arrayProviderProducts[i].id == id){
        this.arrayProviderProducts.splice(i,1);
        i--;
      }
    }
    console.log('Despues');
    console.log(this.arrayProviderProducts.length);
    this.fnLoadProducts();
    this.fnCheckRemainingProducts();
  }

  fnLoadPaymentMethods(){
    this.paymentMethodsService.fnGetPaymentMethods()
    .then(res => {
      res.data.forEach(element => {
        this.arrayPaymentForms.push(element);
      });
      console.log('Metodos de pago');
      console.log(this.arrayPaymentForms);
    })
    .catch(rej => {
      console.log('Error payment methods');
      console.log(rej);
    })
  }

  fnLoadProviders(){
    this.tableLoad = false;
    this.arrayProviders = [];
    this.providerService.fnGetProviders()
    .then(res => {
      res.data.forEach(element => {
        this.arrayProviders.push(element);
      });
      this.tableLoad = true;
      console.log('RESPUESTA');
      console.log(this.arrayProviders);
    })
    .catch(rej => {

    });
  }

  fnLoadProviderInfo(id){
    this.providerService.fnGetProviderById(id)
    .then(res => {
      this.currentProvider = res.data;
      console.log('Dentro de la respuesta');
      console.log(res);
      this.currentProvider = res.data;
      console.log('CurrentProvider');
      console.log(this.currentProvider);
      this.currentView = 1;
      this.arrayProviderProducts = this.currentProvider.products;
      this.fnLoadProducts();
      this.fnOpenModal();
    })
  }

  fnLoadProducts(){
    this.arrayProducts = [];
    this.productService.fnGetProducts()
    .then(res => {
      res.data.forEach(element => {
        this.arrayProducts.push(element);
      })
      this.fnCheckRemainingProducts();
    })
    .catch();
  }

  fnAddProduct(){
    this.idError = false;
    this.priceError = false;

    console.log('ID');
    console.log(this.currentProduct.id);

    //let data = this.arrayProducts[this.currentProduct.id];
    let data = this.arrayProducts.find(element => element.id == this.currentProduct.id);


    console.log('AL CONSULTAR');
    console.log(data);

    if(this.currentProduct.id == undefined || this.currentProduct.id == '0'){
      this.idError = true;
    }
    if(this.currentProduct.price == undefined || this.currentProduct.price == ''){
      this.priceError = true;
    }
    if(this.priceError || this.idError ){
      return;
    }
    console.log(data);
    let newProduct = {
      id:this.currentProduct.id,
      name:data.name,
      price:this.currentProduct.price
    }
    this.arrayProviderProducts.push(newProduct);
    
    console.log(this.arrayProviderProducts);

    this.currentProduct = {
      id:'',
      name:'',
      price:''
    };

    //this.newForm.controls['']
    this.fnCheckRemainingProducts();
  }

  onOptionsSelected(event){
    console.log(event); //option value will be sent as event
    this.currentProduct.id = event;
   }

  onSubmitNew(){
    let data = {
      name: this.newForm.value.name,
      email: this.newForm.value.email,
      phone_number: this.newForm.value.phone_number,
      schedule: this.newForm.value.schedule,
      products: this.arrayProviderProducts,
      business_name: this.newForm.value.business_name,
      contact_job: this.newForm.value.contact_job,
      contact_name: this.newForm.value.contact_name,
      bank_account: this.newForm.value.bank_account,
      bank: this.newForm.value.bank,
      credit: this.newForm.value.credit,
      max_purchase_allowed: this.newForm.value.max_purchase_allowed,
      is_producer: this.newForm.value.is_producer,
      payment_form_id: this.newForm.value.payment_form_id
    };
    console.log('Data Provider');
    console.log(data);
    this.providerService.fnPostProviderNew(data)
    .then(res => {
      console.log('RESPUESTA');
      console.log(res);
      Swal.fire({
        icon:'success',
        title:'Correcto!',
        text:'Se agrego el proveedor correctamente',
        didClose:() => {
          this.fnLoadProviders();
          this.fnCloseModal();
        }
      })
    })
    .catch(rej => {
      console.log('SALIO ALGO MAL');
      console.log(rej);
      Swal.fire({
        icon:'error',
        title:'Error!',
        text:'Hubo un error al intentar agregar el nuevo proveedor'
      })
    })
  }

  onSubmitEdit(){
    let data = {
      name:(this.newForm.value.name == undefined) ? this.currentProvider.name : this.newForm.value.name,
      email:(this.newForm.value.email == undefined) ? this.currentProvider.email : this.newForm.value.email,
      phone_number:(this.newForm.value.phone_number == undefined) ? this.currentProvider.phone_number : this.newForm.value.phone_number,
      schedule:(this.newForm.value.schedule == undefined) ? this.currentProvider.schedule : this.newForm.value.schedule,
      contact:(this.newForm.value.contact == undefined) ? this.currentProvider.contact : this.newForm.value.contact,
      products:this.arrayProviderProducts,
      id:this.currentProvider.id,
      business_name:(this.newForm.value.business_name == undefined)? this.newForm.value.business_name: this.newForm.value.business_name,
      contact_job:(this.newForm.value.contact_job == undefined)? this.newForm.value.contact_job: this.newForm.value.contact_job,
      contact_name:(this.newForm.value.contact_name == undefined)? this.newForm.value.contact_name: this.newForm.value.contact_name,
      bank_account:(this.newForm.value.bank_account == undefined)? this.newForm.value.bank_account: this.newForm.value.bank_account,
      bank:(this.newForm.value.bank == undefined)? this.newForm.value.bank: this.newForm.value.bank,
      credit:(this.newForm.value.credit == undefined)? this.newForm.value.credit: this.newForm.value.credit,
      max_purchase_allowed:(this.newForm.value.max_purchase_allowed == undefined)? this.newForm.value.max_purchase_allowed: this.newForm.value.max_purchase_allowed,
      is_producer:(this.newForm.value.is_producer == undefined)? this.newForm.value.is_producer: this.newForm.value.is_producer,
      payment_form_id:(this.newForm.value.payment_form_id == undefined)? this.newForm.value.payment_form_id: this.newForm.value.payment_form_id
    };
    this.providerService.fnPutEditProvider(data)
    .then(res => {
      console.log('Respuesta');
      console.log(res.data);
      Swal.fire({
        icon:'success',
        title:'Correcto!',
        text:'Se edito correctamente el proveedor',
        didClose:() => {
          this.fnLoadProviders();
          this.fnCloseModal();
        }
      })
    })
    .catch(rej => {
      Swal.fire({
        icon:'error',
        title:'Error!',
        text:'Algo salio mal al intentar editar el proveedor',
        didClose:() => {

        }
      });
      console.log('Error al editar');
      console.log(rej);
    });
  }

  fnCheckRemainingProducts(){
    for(var i = 0 ; i < this.arrayProviderProducts.length; i ++ ){      
      for(var j = 0; j < this.arrayProducts.length; j ++){
        if( this.arrayProviderProducts[i].id == this.arrayProducts[j].id){
          this.arrayProducts.splice(j,1);
          j--;
        }
      }
    }
  }

  fnCheckErrors(cadena){
    return this.errors[cadena] ?? false;
  }
}
