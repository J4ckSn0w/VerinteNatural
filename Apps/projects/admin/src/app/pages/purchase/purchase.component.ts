import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PurchaseService } from '../../services/purchase.service';
import { NgbModal, ModalDismissReasons, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WarehouseService } from '../../services/warehouse.service';
import { ProviderService } from '../../services/provider.service';
import { ProductService } from'../../services/product.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  /*Modal Inicio*/
  newForm = new FormGroup({
    date: new FormControl(null,[Validators.required]),
    warehouse_id: new FormControl(null,[Validators.required]),
    provider_id: new FormControl(null,[Validators.required]),
    total: new FormControl(null,[Validators.required]),
    subtotal:new FormControl(null,[Validators.required]),
    iva:new FormControl(null),
    quantity:new FormControl(null),
    unit_price:new FormControl(null),
  });

  currentView = 0;
  arrayViewsNames = ['Nueva orden de compra','Editar orden de compra','Info orden de compra'];

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
    this.fnLoadPurchases();
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
    private purchaseService: PurchaseService,
    private modalService: NgbModal,
    private warehouseService:WarehouseService,
    private providerService:ProviderService,
    private productService:ProductService
  ) { }

  firstDate : NgbDateStruct;

  arrayPurchases = [];

  arrayWarehouses = [];

  arrayProviders = [];

  arrayProducts = [];
  arrayOrderProducts = [];

  currentProduct = {
    name:'',
    id:'',
    unit_price:'',
    quantity:'',
  }

  currentProvider = 0;

  subtotal = 0;
  total = 0;
  iva = 0;

  ngOnInit(): void {
  }

  fnNew(){
    this.newForm.reset();
    this.arrayOrderProducts = [];
    this.currentView = 0;
    this.currentProvider = 0;
    this.show = false;
    this.fnLoadWarehouses();
    this.fnLoadProviders();
    //this.fnLoadProducts();
    this.fnOpenModal();
  }

  fnEdit(id){}

  fnVer(id){}

  fnDelete(id){}

  fnLoadPurchases(){}

  fnLoadPurchase(id){}

  fnLoadProviders(){
    this.arrayProviders = [];
    this.providerService.fnGetProviders()
    .then(res => {
      res.data.forEach(element => {
        this.arrayProviders.push(element);
      })
    })
    .catch(rej => {
      console.log('Error');
      console.log(rej);
    })
  }

  fnLoadWarehouses(){
    this.arrayWarehouses = [];
    this.warehouseService.fnGetWarehouses()
    .then(res => {
      res.data.forEach(element => {
        this.arrayWarehouses.push(element);
      })
    })
    .catch(rej => {
      console.log('Error');
      console.log(rej);
    })
  }

  fnLoadProducts(id){
    this.arrayProducts = [];
    this.providerService.fnGetProviderById(id)
    .then(res => {
      console.log('Respuesta');
      console.log(res);
      res.data.products.forEach(element => {
        this.arrayProducts.push(element);
      })
      /*res.data.forEach(element => {
        this.arrayProducts.push(element);
      })*/
    })
    .catch(rej => {
      console.log('Error productos');
      console.log(rej);
    })
  }

  onOptionsSelected(event){
    console.log('Entre en OptionSelecte');
    console.log(event); //option value will be sent as event
    this.currentProduct.id = event;
    let data = this.arrayProducts.find(element => element.id == this.currentProduct.id);
    console.log('ENCONTRADO');
    console.log(data);
    this.newForm.controls['unit_price'].setValue(data.price);
  }

  onProviderSelected(event){
    console.log('Entre a ProviderSelected');
    this.arrayOrderProducts = [];//Limpiamos el array de productos cuando cambie de proveedor
    this.fnCalculateTotal();
    console.log('Provider');
    console.log(event);
    this.currentProvider = event;
    this.fnLoadProducts(event);
    this.newForm.controls['quantity'].setValue('');//Reinicia el valor del input para que no se quede con la misma cantidad pasada
    this.newForm.controls['unit_price'].setValue('');//Reinicia el valor del input para que no se quede con la misma cantidad pasada
  }

  fnDeleteProduct(id){
    console.log('Entre aqui');
    console.log(this.arrayOrderProducts.length);
    for(var i = 0 ; i < this.arrayOrderProducts.length; i ++ ){
      if( this.arrayOrderProducts[i].id == id){
        this.arrayOrderProducts.splice(i,1);
        i--;
      }
    }  
    this.fnLoadProducts(this.currentProvider);
    this.fnCheckRemainingProducts()
    this.fnCalculateTotal();
  }

  fnAddProduct(){
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
      name:data.name,
      unit_cost:this.newForm.value.unit_price
    }

    console.log('Nuevo producto');
    console.log(newProduct);
    this.arrayOrderProducts.push(newProduct);

    /*Agregar a la suma de subtotal y total */
    this.fnCalculateTotal();
    console.log('Valor de quantity');
    this.newForm.controls['quantity'].setValue('');//Reinicia el valor del input para que no se quede con la misma cantidad pasada
    this.newForm.controls['unit_price'].setValue('');//Reinicia el valor del input para que no se quede con la misma cantidad pasada

    this.fnCheckRemainingProducts();

    
  }

  fnCalculateTotal(){
    this.subtotal = 0;
    this.total = 0;
    for(var i=0; i< this.arrayOrderProducts.length; i++)
    {
      console.log('price');
      console.log(this.arrayOrderProducts[i].unit_cost);
      console.log('number');
      console.log(this.arrayOrderProducts[i].quantity);
      this.subtotal += Number(this.arrayOrderProducts[i].unit_cost) * Number(this.arrayOrderProducts[i].quantity);
    }
    this.total = this.subtotal + this.subtotal*Number(this.newForm.value.iva)/100;


    //this.subtotal += (Number(this.newForm.value.quantity) * Number(this.newForm.value.unit_price));
    console.log('SUBTOTAL');
    console.log(this.subtotal);
    if(this.subtotal === 0 || this.total === 0){
      this.newForm.controls['subtotal'].setValue('');
      this.newForm.controls['total'].setValue('');
    }
    else{
      this.newForm.controls['subtotal'].setValue(this.subtotal);
      this.newForm.controls['total'].setValue(this.total);
    }
  }

  fnIvaChange(event){
    this.fnCalculateTotal();
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

  onSubmitEdit(){}

  onSubmitNew(){}

}
