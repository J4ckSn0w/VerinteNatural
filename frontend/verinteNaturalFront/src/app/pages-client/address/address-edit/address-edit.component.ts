import { Component, OnInit } from '@angular/core';
import { Routes, Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AddressService } from '../../../services/address.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-address-edit',
  templateUrl: './address-edit.component.html',
  styleUrls: ['./address-edit.component.css']
})
export class AddressEditComponent implements OnInit {

  addressId;
  currentAddress = {
    street: "",
    number: "",
    zip_code: "",
    suburb: "",
    municipality_id: ""
  };

  editAddressForm = new FormGroup({
    street: new FormControl(null,[Validators.required]),
    number: new FormControl(null, [Validators.required]),
    zip_code: new FormControl(null,[Validators.required]),
    suburb: new FormControl(null, [Validators.required]),
    municipality_id: new FormControl(null,[Validators.required])
  });

  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private addressService: AddressService
  ) { }

  ngOnInit(): void {
    this.addressId = this.route.snapshot.params.id;
    this.fnLoadAddress();
  }

  fnLoadAddress(){
    this.addressService.fnGetAddressById(this.addressId)
    .then(res => {
      this.currentAddress = res.data;
      console.log(res);
    })
    .catch(rej =>{
      console.log('Hubo un error al traer la direccion.');
      console.log(rej);
    });
  }

  onSubmit(){
    Swal.showLoading();
    let data = {
      street: (this.editAddressForm.value.street == undefined) ? this.currentAddress.street : this.editAddressForm.value.street,
      number: (this.editAddressForm.value.number == undefined) ? this.currentAddress.number : this.editAddressForm.value.number,
      zip_code: (this.editAddressForm.value.zip_code == undefined) ? this.currentAddress.zip_code : this.editAddressForm.value.zip_code,
      suburb: (this.editAddressForm.value.suburb == undefined) ? this.currentAddress.suburb : this.editAddressForm.value.suburb,
      municipality_id: (this.editAddressForm.value.municipality_id == undefined)? this.currentAddress.municipality_id : this.editAddressForm.value.municipality_id,
      id: this.addressId      
    };
    this.addressService.fnEditAddress(data)
    .then(res => {
      Swal.hideLoading();
      Swal.fire({
        icon: 'success',
        title: 'Correcto.',
        text: 'Se edito la direccion correctamente.',
        didClose: () => {
          this.router.navigate(["/store/address"]);
        }
      })
    })
    .catch(rej => {
      Swal.hideLoading();
      Swal.fire({
        icon:'error',
        title: 'Error!',
        text: 'Algo salio mal.',
        didClose: () => {
          this.router.navigate(["/store/address"]);
        }
      })
      console.log('Algo salio mal');
      console.log(rej);
    });
  }

}
