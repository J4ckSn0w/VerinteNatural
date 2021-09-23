import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ProductTypeService } from '../../services/product-type.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  /*Modal Inicio*/
  newForm = new FormGroup({
    name: new FormControl(null,[Validators.required]),
    description: new FormControl(null,[Validators.required]),
    product_is_by_part: new FormControl(null),
    product_type_id: new FormControl(null,[Validators.required]),
    image:new FormControl(null,[Validators.required]),
    minium_stock:new FormControl(null,[Validators.required]),
    filename:new FormControl(null)
  });

  currentView = 0;
  arrayViewsNames = ['Nuevo producto','Editar producto','Info producto'];

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
    this.fnLoadProducts();
  }

  fnOpenModal(){
    this.modalService.open(this.myModal).result.then((result) => {

    },(reason) => {
      this.getDismissReason(reason);
    })
  }

  @ViewChild('myModal') myModal:ElementRef;

  tableLoad = false;

  /**Modal Final */

  arrayProducts = [];
  arrayProductTypes = [];

  currentProduct = {
    name:'',
    product_type_id:'',
    description:'',
    image:'',
    id:'',
    minium_stock:''
  }

  base;

  constructor(
    private modalService: NgbModal,
    private productService: ProductService,
    private productTypeService: ProductTypeService
  ) { }

  ngOnInit(): void {
    this.fnLoadProducts();
  }

  handleUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        //console.log(reader.result);
        this.base = reader.result;
    };
    this.fnPreview(event);
  }

  fnEdit(id){
    this.show = false;
    this.fnLoadProductInfo(id);
  }
  fnVer(id){
    this.show = true;
    this.fnLoadProductInfo(id)
  }
  fnDelete(id){
    Swal.fire({
      icon:'warning',
      title:'Eliminar Producto',
      text:'Desea eliminar este producto?',
      showDenyButton:true,
      denyButtonText:'Si',
      confirmButtonText:'No'
    }).then(result => {
      if(result.isDenied){
        this.productService.fnDeleteProduct(id)
        .then(res => {
          Swal.fire({
            icon:'success',
            title:'Correcto!',
            text:'Se elimino el producto correctamente',
            didClose:() => {
              //this.router.navigate(["/system/products"]);
              this.fnCloseModal();
            }
          })
        })
        .catch(rej => {
          Swal.fire({
            icon:'error',
            title:'Error!',
            text:'Ocurrio un error al intentar eliminar el producto'
          });
        })
      }
    })
  }
  fnNew(){
    this.newForm.reset();
    this.base = '';
    this.filePath = '';
    this.currentView = 0;
    this.fnOpenModal();
  }
  fnLoadProducts(){
    this.arrayProductTypes = [];
    this.arrayProducts = [];
    this.productService.fnGetProducts()
    .then(res => {
      res.data.forEach(element => {
        this.arrayProducts.push(element);
      })
      this.tableLoad = true;
    });
    this.productTypeService.fnGetProductTypes()
    .then(res => {
      res.data.forEach(element => {
        this.arrayProductTypes.push(element);
      })
    });
    console.log('Productos');
    console.log(this.arrayProducts);
  }

  fnLoadProductInfo(id){
    this.filePath = '';
    this.productService.fnGetProductById(id)
    .then(res => {
      this.currentProduct = res.data;
      this.filePath = ('data:image/jpeg;base64,' + this.currentProduct.image) as string;
      this.currentView = 1;
      this.fnOpenModal();
      console.log('Producto:');
      console.log(res);
    })
    .catch(rej => {
      console.log('Algo salio mal');
      console.log(rej);
    })
  }

  onSubmitNew(){
    let data = {
      name : this.newForm.value.name,
      description: this.newForm.value.description,
      product_is_by_part: this.newForm.value.product_is_by_part,
      product_type_id: this.newForm.value.product_type_id,
      image: this.base,
      minium_stock: this.newForm.value.minium_stock
    };
    console.log('DATA');
    console.log(data);
    this.productService.fnPostNewProduct(data)
    .then(res => {
      Swal.fire({
        icon:'success',
        title:'Correcto!',
        text:'Se agrego el nuevo producto correctamente.',
        didClose:() => {
          //this.router.navigate(["/system/product"]);
          this.fnCloseModal();
        }
      })
    })
    .catch(rej => {
      Swal.fire({
        icon:'error',
        title:'Error!',
        text:'Ocurrio un error al intentar agregar el nuevo producto'
      })
      console.log(rej);
    });
    
  }
  onSubmitEdit(){
    let data = {
      name:(this.newForm.value.name == undefined) ? this.currentProduct.name : this.newForm.value.name,
      description: (this.newForm.value.description == undefined) ? this.currentProduct.description : this.newForm.value.description,
      product_type_id:(this.newForm.value.product_type_id == undefined) ? this.currentProduct.product_type_id : this.newForm.value.product_type_id,
      id:this.currentProduct.id,
      image: this.filePath,
      minium_stock: (this.newForm.value.minium_stock == undefined) ? this.currentProduct.minium_stock : this.newForm.value.minium_stock
    };
    console.log('Data');
    console.log(data);
    this.productService.fnPutEditProduct(data)
    .then(res => {
      Swal.fire({
        icon:'success',
        title:'Correcto',
        text:'Se edito correctamente',
        didClose:() => {
          this.fnCloseModal();
        }
      })
    })
    .catch(rej => {
      Swal.fire({
        icon:'error',
        title:'Error',
        text:'hubo un error al intentar editar el producto',
        didClose:() => {
        }
      });
      console.log('Error al editar');
      console.log(rej);
    })
  }

  /*Preview de imagen*/
  filePath: string;
  fnPreview(e){
    const file = (e.target as HTMLInputElement).files[0];

    console.log('file');
    console.log(file);

    this.newForm.patchValue({
      img: file
    });

    this.newForm.get('image').updateValueAndValidity();

    const reader = new FileReader();
    console.log('reader');
    console.log(reader);
    reader.onload = () => {
      this.filePath = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

}
