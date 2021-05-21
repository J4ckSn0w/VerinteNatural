import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HarvestService } from '../../services/harvest.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
    this.modalService.open(this.myModal,{size:'lg'}).result.then((result) => {

    },(reason) => {
      this.getDismissReason(reason);
    })
  }

  @ViewChild('myModal') myModal:ElementRef;


  /**Modal Final */

  constructor(
    private haverstService: HarvestService,
    private modalService: NgbModal
  ) { }

  tableLoad = false;

  arrayHarvestSheets = [];

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

}
