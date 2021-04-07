import { Component, OnInit } from '@angular/core';
import { WarehouseService } from '../../../services/warehouse.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-warehouse-control',
  templateUrl: './warehouse-control.component.html',
  styleUrls: ['./warehouse-control.component.css']
})
export class WarehouseControlComponent implements OnInit {

  arrayWarehouses = [];

  constructor(
    private warehouseService: WarehouseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fnLoadWarehouses();
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
      this.fnLoadWarehouses();
    })
  }

  fnEdit(id){
    let show = false;
    console.log('Antes de cambiar de lugar en edit');
    console.log(show);
    this.router.navigate(["/system/warehouse/edit",id],{queryParams:{show:show},skipLocationChange:true});
  }

  fnVer(id){
    let show = true;
    console.log('Antes de cambiar de lugar en ver');
    console.log(show);
    this.router.navigate(["/system/warehouse/edit",id],{queryParams:{show:show},skipLocationChange:true});
  }

  fnDelete(id){
    console.log('Entre');
    Swal.fire({
      icon:'warning',
      title:'Eliminar',
      text:'Desea eliminar este almacen?',
      showDenyButton:true,
      denyButtonText:'Si',
      confirmButtonText:'No'
    }).then(resultado => {
      if(resultado.isDenied){
        this.warehouseService.fnDeleteWarehouse(id)
    .then(res =>{
      Swal.fire({
        icon:'success',
        title: 'Correcto',
        text: 'Se elimino el almacen correctamente',
        didClose: () => {
          this.fnLoadWarehouses();
        }
      })
    })
    .catch(rej => {
      Swal.fire({
        icon:'error',
        title:'Error!',
        text:'Ocurrio un error al intentar eliminar el almacen.',
        didClose: () => {
        }
      })
    });
      }
    })
  }

}
