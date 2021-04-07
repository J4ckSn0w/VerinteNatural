import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { VehicleTypeService } from '../../../services/vehicle-type.service';
import { Router, RouterLinkActive, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehicle-type-edit',
  templateUrl: './vehicle-type-edit.component.html',
  styleUrls: ['./vehicle-type-edit.component.css']
})
export class VehicleTypeEditComponent implements OnInit {

  sub;
  show;

  currentVehicleType = {
    name:'',
    max_weight:''
  };

  editVehicleTypeForm = new FormGroup({
    name: new FormControl(null,[Validators.required]),
    max_weight: new FormControl(null,[Validators.required])
  });

  constructor(
    private vehicleTypeService: VehicleTypeService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.fnGetVehicleType();

    this.sub = this.route.queryParams.subscribe(params => {
      if(params.show == "true"){
        this.show = true;
      }
      else{
        this.show = false;
      }
    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.sub.unsubscribe();
  }

  fnGetVehicleType(){
    this.vehicleTypeService.fnGetVehicleTypeById(this.route.snapshot.params.id)
    .then(res => {
      console.log('Respuesta:');
      console.log(res);
      this.currentVehicleType = res.data;
    })
    .catch(rej => {

    })
  }

  onSubmit(){
    let data = {
      name: (this.editVehicleTypeForm.value.name == undefined) ? this.currentVehicleType.name : this.editVehicleTypeForm.value.name,
      max_weight: (this.editVehicleTypeForm.value.max_weight == undefined) ? this.currentVehicleType.max_weight : this.editVehicleTypeForm.value.max_weight
    };
    console.log('Data');
    console.log(data);
    this.vehicleTypeService.fnPostEditVehicleType(data,this.route.snapshot.params.id)
    .then(res => {
      Swal.fire({
        icon:'success',
        title:'Correcto!',
        text:'Se edito el tipo de vehiculo correctamente',
        didClose:() => {
          this.router.navigate(["/system/vehicle-type"]);
        }
      });
    })
    .catch(rej => {
      Swal.fire({
        icon:'error',
        title:'Error!',
        text:'Ocurrio un error al intentar editar el tipo de vehiculo'
      });
    })
  }

}
