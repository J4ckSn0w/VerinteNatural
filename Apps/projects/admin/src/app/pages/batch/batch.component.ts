import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BatchesService } from '../../services/batches.service';
import { ProviderComponent } from '../provider/provider.component';
import { ProviderService } from '../../services/provider.service';
import { ProductService } from '../../services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.css']
})
export class BatchComponent implements OnInit {

  /*Modal Inicio*/
  newForm = new FormGroup({
    unit_cost: new FormControl(null,[Validators.required]),
    quantity: new FormControl(null,[Validators.required]),
    provider_id: new FormControl(null,[Validators.required]),
    product_id: new FormControl(null,[Validators.required])
  });

  currentView = 0;
  arrayViewsNames = ['Nuevo lote','Editar lote','Info lote'];

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

  /**Modal Final */

  arrayBatches = [];

  arrayProviders = [];

  arrayProducts = [];

  currentBatch = {
    unit_cost:'',
    quantity:'',
    provider_id:'',
    product_id:'',
    id:''
  }

  constructor(
    private modalService:NgbModal,
    private batchesService:BatchesService,
    private providerService:ProviderService,
    private productService:ProductService
  ) { }

  ngOnInit(): void {
    this.fnLoadBatches();
  }

  fnVer(id){
    this.show = false;
    this.fnLoadBatchInfo(id);
  }

  fnEdit(id){
    this.show = true;
    this.fnLoadBatchInfo(id);
  }

  fnNew(){
    this.currentView = 0;
    this.fnLoadProviders();
    this.fnOpenModal();
  }

  fnDelete(id){
    Swal.fire({
      icon:'warning',
      title:'Eliminar?',
      text:'Desea eliminar este lote?',
      showDenyButton:true,
      denyButtonText:'Si',
      confirmButtonText:'No'      
    }).then((result) => {
      if(result.isDenied){
        this.batchesService.fnDeleteBatch(id)
        .then(res => {
          Swal.fire({
            icon:'success',
            title:'Correcto!',
            text:'Se elimino el lote correctamente',
            didClose:() => {
              this.fnLoadBatches();
            }
          })
        })
      }
    })
  }

  fnLoadBatches(){
    this.arrayBatches = [];
    this.batchesService.fnGetBatches()
    .then(res => {
      res.data.forEach(element => {
        this.arrayBatches.push(element);
      })
      console.log(res);
    });
  }

  fnLoadBatchInfo(id){
    this.batchesService.fnGetBatchById(id)
    .then(res => {
      this.currentBatch = res.data;
      this.currentView = 1;
      this.fnLoadProviderInfo(this.currentBatch.provider_id);
      this.fnOpenModal();
    })
  }

  fnLoadProviderInfo(id){
    this.providerService.fnGetProviderById(id)
    .then(res => {
      console.log('Proveedor');
      console.log(res.data);
    })
    .catch(rej => {
      console.log('Algo salio mal');
      console.log(rej);
    })
  }

  fnLoadProviders(){
    this.arrayProviders = [];
    this.providerService.fnGetProviders()
    .then(res => {
      console.log('Cargando proveedores');
      console.log(res.data);
      res.data.forEach(element => {
        this.arrayProviders.push(element);
      })
    })
    .catch(rej => {

    })
  }

  onOptionsSelected(event){
    //console.log(event);
    this.arrayProducts = [];
    this.providerService.fnGetProviderById(event)
    .then(res => {
      console.log(res);
      res.data.products.forEach(element => {
        this.arrayProducts.push(element);
      })
    })
  }


  onSubmitNew(){
    let data = {
      unit_cost: this.newForm.value.unit_cost,
    quantity: this.newForm.value.quantity,
    provider_id: this.newForm.value.provider_id,
    product_id: this.newForm.value.product_id
    }
    this.batchesService.fnPostNewBatch(data)
    .then(res => {
      Swal.fire({
        icon:'success',
        title:'Correcto!',
        text:'Se agrego el nuevo lote',
        didClose:() => {
          this.fnLoadBatches();
        }
      })
    })
    .catch(rej => {
      Swal.fire({
        icon:'error',
        title:'Error!',
        text:'Hubo un error al intentar agregar el lote'        
      });
    });
  }

  onSubmitEdit(){
    let data = {
      quantity:(this.newForm.value.quantity == undefined) ? this.currentBatch.quantity : this.newForm.value.quantity,
      unit_cost:(this.newForm.value.unit_cost == undefined) ? this.currentBatch.unit_cost : this.newForm.value.unit_cost,
      id:this.currentBatch.id,
      provider_id:this.currentBatch.provider_id,
      product_id:this.currentBatch.product_id
    }
    this.batchesService.fnPuteditbatch(data)
    .then(res => {
      Swal.fire({
        icon:'success',
        title:'Correcto!',
        text:'Se edito correctamente el lote',
        didClose:() => {
          this.fnLoadBatches();
        }
      })
    })
    .catch(rej => {
      Swal.fire({
        icon:'error',
        title:'Error!',
        text:'Hubo un error al intentar editar el lote',
      });
      console.log(rej);
    })
  }
}
