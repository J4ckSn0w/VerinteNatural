import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HarvestService } from '../../services/harvest.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-harvest-sheet',
  templateUrl: './harvest-sheet.component.html',
  styleUrls: ['./harvest-sheet.component.css']
})
export class HarvestSheetComponent implements OnInit {

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


  /**Modal Final */

  constructor(
    private haverstService: HarvestService,
    private modalService: NgbModal,
    private storageService: StorageService
  ) { }

  tableLoad = false;

  arrayHarvestSheets = [];

  arrayWarehouseOrderProducts = [];

  currentHarvestSheet = {
        "id": '',
        "address": '',
        "contact_name": '',
        "payment_form_id": '',
        "employee_id": '',
        "collect_to": '',
        "harvest_id": '',
        "folio": '',
        "status": '',
        "status_name": '',
        "created_at": '',
        "updated_at": '',
        "deleted_at": '',
        "provider": '',
        "warehouse": '',
        "products": [
        ],
        "payment_form_name": '',
        "gatherer_name": ''
  }

  ngOnInit(): void {
    this.fnLoadHarvestSheets();
  }

  fnLoadHarvestSheets(){
    this.tableLoad = false;
    this.arrayHarvestSheets = [];
    this.haverstService.fnGetHarvestSheets()
    .then(res => {
      res.data.forEach(element => {
        this.arrayHarvestSheets.push(element);
      });
      this.tableLoad = true;
    })
    .catch(rej => {
      console.log('Ocurrio un error al intentar traer las hojas de recoleccion');
      console.log(rej);
    })
  }

  fnLoadHarvestSheet(id){
    this.haverstService.fnGetHarvestSheetById(id)
    .then(res => {
      this.currentHarvestSheet = res.data;
      console.log(this.currentHarvestSheet);
    })
    .catch(rej => {
      console.log('Algo salio mal en get harvest sheet by id');
      console.log(rej);
    })
  }

  fnVer(id){
    this.show = false;
    this.currentView = 0;
    this.fnLoadHarvestSheet(id);
    this.fnOpenModal();
  }

  fnRecolectar(id){
    this.show = true;
    this.currentView = 0;
    this.fnLoadHarvestSheet(id);
    this.fnOpenModal();
  }
  
  fnAlmacenar(id){
    this.haverstService.fnGetHarvestSheetById(id)
    .then(res => {
      res.data.products.forEach(element => {
        this.currentHarvestSheet = res.data;
        this.arrayWarehouseOrderProducts.push({
          "id": element.id,
          "authorized_quantity": element.quantity,
          "quantity_collected": element.quantity_real,
          "quantity_stored": 0,
          "sku": element.sku,
          "name":element.name,
          "unit":{
            unit_id:element.unit.id,
            name:element.unit.name
          },
          "unit_id":element.unit.id
        });
      });
      console.log(res.data);
      this.show = true;
      this.currentView = 1;
      this.fnOpenModal();
    })
  }

  onSubmit(){
    console.log('Products');
    console.log(this.currentHarvestSheet.products);
    let data = {
      id:this.currentHarvestSheet.id,
      products:this.currentHarvestSheet.products
    }
    this.haverstService.fnPutHarvestSheet(data)
    .then(res => {
      Swal.fire({
        icon:'success',
        title:'Correcto!',
        text:'Se agrego correctamente las cantidades recolectadas.',
        didClose:() => {
          this.fnLoadHarvestSheets();
          this.fnCloseModal();
        }
      })
    })
    .catch(rej => {
      Swal.fire({
        icon:'error',
        title:'Error!',
        text:'Ocurrio un error al intentar agregar cantidades recolectadas.'        
      })
    })
  }

  onSubmitWarehouse(){
    let data = {
      harvest_sheet_id:this.currentHarvestSheet.id,
      products:this.arrayWarehouseOrderProducts
    };
    console.log('My data');
    console.log(data);
    this.storageService.fnPostStorageOrder(data)
    .then(res => {
      Swal.fire({
        icon:'success',
        title:'Correcto!',
        text:'Se creo la hoja de almacenamiento correctamente',
        didClose:() => {
          this.fnLoadHarvestSheets();
          this.fnCloseModal();
        }
      })
    })
    .catch(rej => {
      console.log('Error al almacenar');
      console.log(rej);
    })
  }

  /**/

}
