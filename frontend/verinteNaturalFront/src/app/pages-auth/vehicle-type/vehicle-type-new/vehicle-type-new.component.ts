import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VehicleTypeService } from '../../../services/vehicle-type.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-type-new',
  templateUrl: './vehicle-type-new.component.html',
  styleUrls: ['./vehicle-type-new.component.css']
})
export class VehicleTypeNewComponent implements OnInit {

  newVehicleTypeForm = new FormGroup({
    name: new FormControl(null,[Validators.required]),
    max_weight: new FormControl(null,[Validators.required])
  });

  constructor(
    private vehicleTypeService: VehicleTypeService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    let data = {
      name: this.newVehicleTypeForm.value.name,
      max_weight: this.newVehicleTypeForm.value.max_weight
    };
    this.vehicleTypeService.fnPostNewVehicleType(data)
    .then(res => {
      Swal.fire({
        icon:'success',
        title:'Correcto!',
        text:'Se creo el nuevo tipo de vehiculo correctamente',
        didClose:() => {
          this.router.navigate(["/system/vehicle-type"]);
        }
      });
    })
    .catch(rej => {
      console.log(rej);
      Swal.fire({
        icon:'error',
        title:'Error!',
        text:'Ocurrio un error al intentar crear el nuevo tipo de vehiculo.'
      });
    });
  }

}
