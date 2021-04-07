import { Component, OnInit } from '@angular/core';
import { VehicleTypeService } from '../../../services/vehicle-type.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehicle-type-control',
  templateUrl: './vehicle-type-control.component.html',
  styleUrls: ['./vehicle-type-control.component.css']
})
export class VehicleTypeControlComponent implements OnInit {

  arrayVehiclesTypes = [];

  constructor(
    private vehicleTypeService: VehicleTypeService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.fnLoadVehicleTypes();
  }

  fnLoadVehicleTypes(){
    this.arrayVehiclesTypes = [];
    this.vehicleTypeService.fnGetVehicleTypes()
    .then(res => {
      res.data.forEach(element => {
        this.arrayVehiclesTypes.push(element);
      });
    })
    .catch(rej => {

    })
  }

  fnEdit(id){
    let show = false;
    console.log('ID');
    console.log(id);
    this.router.navigate(["/system/vehicle-type/edit",id],{queryParams:{show:show},skipLocationChange:true});
  }

  fnVer(id){
    let show = true;
    this.router.navigate(['/system/vehicle-type/edit',id],{queryParams:{show:show},skipLocationChange:true})
  }

  fnDelete(id){
    Swal.fire({
      icon:'warning',
      title:'Eliminar tipo de vehiculo',
      text:'Esta seguro de eliminar este tipo de vehiculo?',
      showDenyButton:true,
      denyButtonText:'Si',
      confirmButtonText:'No'
    }).then(response => {
      if(response.isDenied){
        this.vehicleTypeService.fnDeleteVehicletype(id).
        then(res=> {
          this.fnLoadVehicleTypes();
        })
        .catch(rej => {
          Swal.fire({
            icon:'error',
            title:'Error!',
            text:'Ocurrio un error al intentar eliminar el tipo de vehiculo'
          });
        })
      }
    })
  }
}
