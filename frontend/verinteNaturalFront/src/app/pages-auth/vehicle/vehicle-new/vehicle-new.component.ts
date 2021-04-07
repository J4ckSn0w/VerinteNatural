import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VehicleService } from '../../../services/vehicle.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { VehicleTypeService } from '../../../services/vehicle-type.service';

@Component({
  selector: 'app-vehicle-new',
  templateUrl: './vehicle-new.component.html',
  styleUrls: ['./vehicle-new.component.css']
})
export class VehicleNewComponent implements OnInit {

  arrayVehicleTypes = [];
  arrayVehicleBrands = [];

  newVehicleForm = new FormGroup({
    license_plate: new FormControl(null,[Validators.required]),
    brand: new FormControl(null,[Validators.required]),
    description: new FormControl(null,[Validators.required]),
    vehicle_type_id: new FormControl(null,[Validators.required])
  });
  constructor(
    private vehicleService: VehicleService,
    private vehicleTypeService: VehicleTypeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fnLoadVehicleTypes();
  }

  fnLoadVehicleTypes(){
    this.arrayVehicleTypes = [];
    this.vehicleTypeService.fnGetVehicleTypes()
    .then(res => {
      res.data.forEach(element => {
        this.arrayVehicleTypes.push(element);
      })
    })
    .catch();
  }

  onSubmit(){
    let data = {
      license_plate: this.newVehicleForm.value.license_plate,
      brand: this.newVehicleForm.value.brand,
      description: this.newVehicleForm.value.description,
      vehicle_type_id: this.newVehicleForm.value.vehicle_type_id
    };
    this.vehicleService.fnPostNewVehicle(data)
    .then(res =>{
      Swal.fire({
        icon:'success',
        title:'Correcto!',
        text:'Se creo el ',
        didClose: () => {
          this.router.navigate(["/system/vehicle"]);
        }
      })
    })
    .catch(rej => {
      Swal.fire({
        icon:'error',
        title:'Error!',
        text:'Algo salio mal'
      })
    })
  }

}
