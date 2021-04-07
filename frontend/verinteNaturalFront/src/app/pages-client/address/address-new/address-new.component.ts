import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AddressService } from '../../../services/address.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address-new',
  templateUrl: './address-new.component.html',
  styleUrls: ['./address-new.component.css']
})
export class AddressNewComponent implements OnInit {

  newAddressForm = new FormGroup({
    street: new FormControl(null,[Validators.required]),
    number: new FormControl(null,[Validators.required,Validators.minLength(1)]),
    zip_code: new FormControl(null,[Validators.required]),
    suburb: new FormControl(null, [Validators.required]),
    municipality_id: new FormControl(null,[Validators.required])
  });

  constructor(
    private addressService: AddressService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    let data = {
      street: this.newAddressForm.value.street,
      number: this.newAddressForm.value.number,
      zip_code: this.newAddressForm.value.zip_code,
      suburb: this.newAddressForm.value.suburb,
      municipality_id: this.newAddressForm.value.municipality_id
    };
    this.addressService.fnPostNewAddress(data)
    .then(res => {
      console.log('Direccion creada');
      Swal.fire({
        icon: 'success',
        title: 'Direccion creada!',
        text: 'Direccion creada con exito.',
        didClose: () => {
          this.router.navigate(["/store/address"]);
        }
      })
    })
    .catch(rej => {
      console.log('Error al crear direccion.');
    });
  }

}
