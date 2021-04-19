import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ProviderService } from '../../services/provider.service';
import Swal from 'sweetalert2';

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
    contact: new FormControl(null,[Validators.required]),
    schedule: new FormControl(null,[Validators.required]),
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

  /**Modal Final */

  constructor(
    private modalService: NgbModal,
    private productService: ProductService,
    private providerService: ProviderService
  ) { }

  arrayProviders = [];

  arrayProducts = [];

  arrayProviderProducts = [];

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
    products:[]
  }

  priceError = false;
  idError = false;

  errors = {};

  ngOnInit(): void {
    this.fnLoadProviders();
  }

  fnNew(){
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
  }

  fnLoadProviders(){
    this.arrayProviders = [];
    this.providerService.fnGetProviders()
    .then(res => {
      res.data.forEach(element => {
        this.arrayProviders.push(element);
      });
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
      contact: this.newForm.value.contact,
      schedule: this.newForm.value.schedule,
      products: this.arrayProviderProducts
    };
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
      id:this.currentProvider.id
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
  fnCheckErrors(cadena){
    return this.errors[cadena] ?? false;
  }
}
