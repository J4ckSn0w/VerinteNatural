import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../../services/vehicle.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehicle-control',
  templateUrl: './vehicle-control.component.html',
  styleUrls: ['./vehicle-control.component.css']
})
export class VehicleControlComponent implements OnInit {

  arrayVehicles = [];
  

  constructor(
    private vehicleService:VehicleService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fnLoadvehicles();
  }

  fnLoadvehicles(){
    this.arrayVehicles = [];
    console.log('Carga vehiculos');
    this.vehicleService.fnGetVehicles()
    .then(res => {
      res.data.forEach(element => {
        this.arrayVehicles.push(element);
      });
    })
    .catch(rej => {
      console.log('Algo salio mal');
    })
  }

  fnDelete(id){
    Swal.fire({
      icon:'warning',
      title:'Eliminar vehiculo',
      text:'Desea eliminar este vehiculo?',
      showConfirmButton:true,
      showDenyButton:true,
      confirmButtonText:'No',
      denyButtonText:'Si'
    }).then((result) => {
      if(result.isDenied){
        this.vehicleService.fnDeleteVehicle(id)
        .then(res => {
          Swal.fire({
            icon:'success',
            title:'Correcto',
            text:'Se elimino el vehiculo correctamente',
            didClose: () => {
              this.fnLoadvehicles();
            }
          })
        })
        .catch(rej => {
          Swal.fire({
            icon:'error',
            title:'Error!',
            text:'Ocurrio un error al intentar eliminar el vehiculo.'
          })
        })
      }
    })
    .catch(rej => {

    });
  }

  fnEdit(id=0){
    let show = false;
    this.router.navigate(["/system/vehicle/edit",id],{queryParams:{show:show},skipLocationChange:true});
  }

  fnVer(id){
    let show = true;
    this.router.navigate(['/system/vehicle/edit',id],{queryParams:{show:show},skipLocationChange:true});
  }

}
