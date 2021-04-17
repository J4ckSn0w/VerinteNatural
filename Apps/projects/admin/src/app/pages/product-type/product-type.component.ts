import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductTypeService } from '../../services/product-type.service';
import Swal from 'sweetalert2';
import { ProductCategoriesService } from '../../services/product-categories.service';

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.css']
})
export class ProductTypeComponent implements OnInit {

  /*Modal Inicio*/
  newForm = new FormGroup({
    name: new FormControl(null,[Validators.required]),
    category_id: new FormControl(null,[Validators.required]), 
  });

  currentView = 0;
  arrayViewsNames = ['Nuevo tipo producto','Editar tipo producto','Info tipo producto'];

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
    this.fnLoadProductTypes();
  }

  fnOpenModal(){
    this.modalService.open(this.myModal).result.then((result) => {

    },(reason) => {
      this.getDismissReason(reason);
    })
  }

  @ViewChild('myModal') myModal:ElementRef;

  /**Modal Final */

  currentProductType = {
    name:'',
    id:'',
    category_id:''
  }

  arrayProductTypes = [];

  arrayProductCategory = [];

  constructor(
    private modalService: NgbModal,
    private productTypeService: ProductTypeService,
    private productCategoriesService : ProductCategoriesService
  ) { }

  ngOnInit(): void {
    this.fnLoadProductTypes();
  }

  fnEdit(id){
    this.fnLoadProductTypeinfo(id);
    this.show = true;
  }
  fnDelete(id){
    Swal.fire({
      icon:'warning',
      title:'Eliminar Tipo Producto',
      text:'Desea eliminar el tipo producto?',
      showDenyButton:true,
      denyButtonText:'Si',
      confirmButtonText:'No'
    }).then(result => {
      if(result.isDenied){
        this.productTypeService.fnDeleteProductType(id)
        .then(res => {
          Swal.fire({
            icon:'success',
            title:'Correcto!',
            text:'Se elimino el tipo de producto correctamente'
          });
          this.fnLoadProductTypes();
        })
        .catch(rej => {
          Swal.fire({
            icon:'error',
            title:'Error!',
            text:'Ocurrio un error al intentar eliminar el tipo de producto'
          })                                                                                                                                                                                                
        });
      }
    })
  }

  fnVer(id){
    this.fnLoadProductTypeinfo(id);
    this.show = false;
  }

  fnNew(){
    console.log('Entre');
    this.currentView = 0;
    this.fnOpenModal();
    // this.modalService.open(this.myModal).result.then((result) => {

    // },(reason) => {
    //   this.getDismissReason(reason);
    // })
  }

  fnLoadProductTypes(){
    this.arrayProductTypes = [];
    this.arrayProductCategory = [];
    this.productTypeService.fnGetProductTypes()
    .then(res => {
      res.data.forEach(element => {
        this.arrayProductTypes.push(element);
      });
    })
    .catch(rej => {
    });

    this.productCategoriesService.fnGetProductCategories()
    .then(res => {
      res.data.forEach(element => {
        this.arrayProductCategory.push(element);
      })
    })
    .catch(rej => {
      console.log('Algo salio mal');
    })
  }

  fnLoadProductTypeinfo(id){
    this.productTypeService.fnGetProductType(id)
    .then(res => {
      this.currentProductType = res.data;
      this.currentProductType.id = id;
      this.currentView = 1;
      console.log('Respuesta');
      console.log(this.currentProductType);
      this.fnOpenModal();
    });
  }

  onSubmitNew(){
    let data = {
      name : this.newForm.value.name,
      category_id: this.newForm.value.category_id
    };
    console.log('DATA');
    console.log(data);
    this.productTypeService.fnPostNewProductType(data)
    .then(res => {
      Swal.fire({
        icon:'success',
        title:'Correcto',
        text:'Se creo el nuevo tipo de producto.',
        didClose:() => {
          //this.router.navigate(["/system/product-type"]);
          this.fnCloseModal();
        }
      })
    })
    .catch()
  }

  onSubmitEdit(){
    let data = {
      name: (this.newForm.value.name == undefined) ? this.currentProductType.name : this.newForm.value.name,
      category_id: (this.newForm.value.category_id == undefined) ? this.currentProductType.category_id : this.newForm.value.category_id
    };
    console.log('DATA');
    console.log(data);
    this.productTypeService.fnPutEditProductTypes(data,this.currentProductType.id)
    .then(res => {
      Swal.fire({
        icon:'success',
        title:'Correcto!',
        text:'Se edico el tipo de producto correctament',
        didClose:() => {
          //this.router.navigate(["/system/product-type"]);
          this.fnCloseModal();
        }
      })
      })
    .catch(rej => {
      Swal.fire({
        icon:'error',
        title:'Error!',
        text:'Algo salio mal al intentar editar el tipo de producto.'
      })
    })
  }
}
