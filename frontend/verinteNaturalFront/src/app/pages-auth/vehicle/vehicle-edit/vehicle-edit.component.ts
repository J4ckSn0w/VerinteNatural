import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VehicleService } from '../../../services/vehicle.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { VehicleTypeService } from '../../../services/vehicle-type.service';

@Component({
  selector: 'app-vehicle-edit',
  templateUrl: './vehicle-edit.component.html',
  styleUrls: ['./vehicle-edit.component.css']
})
export class VehicleEditComponent implements OnInit {

  sub;
  show;

  arrayVehicleTypes = [];
  arrayVehicleBrands = [];

  currentVehicle = {
    license_plate: '',
    brand: '',
    description: '',
    vehicle_type_id: ''
  };

  editVehicleForm = new FormGroup({
    license_plate: new FormControl(null,[Validators.required]),
    brand: new FormControl(null,[Validators.required]),
    description: new FormControl(null,[Validators.required]),
    vehicle_type_id: new FormControl(null,[Validators.required]),

  });

  constructor(
    private vehicleService: VehicleService,
    private vehicleTypeService: VehicleTypeService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.fnLoadVehicleInfo();

    this.sub = this.route.queryParams.subscribe(paramas => {
      if(paramas.show == "true"){
        this.show = true;
      }
      else{
        this.show = false;
      }
    })
  }

  fnLoadVehicleInfo(){
    this.vehicleService.fnGetVehicleById(this.route.snapshot.params.id)
    .then(res => {
      console.log('Data');
      console.log(res);
      this.currentVehicle = res.data;
    })
    .catch(rej =>{

    });

    this.vehicleTypeService.fnGetVehicleTypes()
    .then(res => {
      res.data.forEach(element => {
        this.arrayVehicleTypes.push(element);
      })
    })
    .catch();
    console.log('ARRAY');
    console.log(this.arrayVehicleTypes);
    this.arrayVehicleTypes.forEach(element => {
      console.log(element);
    })
  }

  onSubmit(){
    let data = {
      license_plate : (this.editVehicleForm.value.license_plate == undefined) ? this.currentVehicle.license_plate : this.editVehicleForm.value.license_plate,
      brand : (this.editVehicleForm.value.brand == undefined) ? this.currentVehicle.brand : this.editVehicleForm.value.brand,
      description: (this.editVehicleForm.value.description == undefined) ? this.currentVehicle.description : this.editVehicleForm.value.description,
      vehicle_type_id: (this.editVehicleForm.value.vehicle_type_id == undefined) ? this.currentVehicle.vehicle_type_id : this.editVehicleForm.value.vehicle_type_id
    };
    this.vehicleService.fnPostUpdateVehicle(data,this.route.snapshot.params.id)
    .then(res => {
      Swal.fire({
        icon:'success',
        title:'Correcto!',
        text:'Se edito el vehiculo con exito.',
        didClose: () => {
          this.router.navigate(["/system/vehicle"])
        }
      })
    })
    .catch(rej => {
      Swal.fire({
        icon:'error',
        title:'Error!',
        text:'Ocurrio un error al intentar editar el vehiculo.',
        didClose: () => {
        }
      });
    })
  }
}
