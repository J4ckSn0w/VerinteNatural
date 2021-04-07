import { Component, OnInit } from '@angular/core';
import { WarehouseService } from '../../../services/warehouse.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { WarehouseTypeService } from '../../../services/warehouse-type.service';

@Component({
  selector: 'app-warehouse-type-control',
  templateUrl: './warehouse-type-control.component.html',
  styleUrls: ['./warehouse-type-control.component.css']
})
export class WarehouseTypeControlComponent implements OnInit {
  arrayWarehouseTypes = [];

  constructor(
    private warehouseTypeService: WarehouseTypeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fnGetWarehousetypes();
  }

  fnGetWarehousetypes(){
    this.arrayWarehouseTypes = [];
    this.warehouseTypeService.fnGetWarehouses()
    .then(res => {
      res.data.forEach(element => {
        this.arrayWarehouseTypes.push(element);
      });
    })
    .catch(rej => {
      this.fnGetWarehousetypes();
    })
  }

  fnEdit(id){
    let show = false;
    this.router.navigate(["/system/warehouse-type/edit",id],{queryParams:{show:show},skipLocationChange:true});
  }

  fnVer(id){
    let show = true;
    this.router.navigate(['/system/warehouse-type/edit',id],{queryParams:{show:show}, skipLocationChange:true})
  }

  fnDelete(id){
    Swal.fire({
      icon:'warning',
      title:'Borrar tipo de almacen',
      text:'Desea borrar este tipo de almacen?',
      showDenyButton:true,
      denyButtonText:'Si'
    }).then(resultado => {
      if(resultado.isDenied){
        this.warehouseTypeService.fnDeleteWarehouseType(id)
        .then(res => {
          Swal.fire({
            icon:'success',
            title:'Correcto!',
            text:'Se borro el tipo de almacen correctamente',
            didClose:() => {
              this.fnGetWarehousetypes();
            }
          })
        })
      }
    })
  }

}
