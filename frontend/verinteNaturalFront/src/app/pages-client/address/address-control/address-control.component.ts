import { Component, OnInit } from '@angular/core';
import { AddressService } from '../../../services/address.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-address-control',
  templateUrl: './address-control.component.html',
  styleUrls: ['./address-control.component.css']
})
export class AddressControlComponent implements OnInit {

  arrayAddress = [];

  constructor(
    private addressService: AddressService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fnLoadAddress();
  }

  fnLoadAddress(){
    this.arrayAddress = [];
    this.addressService.fnGetAllAddress()
    .then(res => {
      res.data.forEach(element => {
        this.arrayAddress.push(element);
      });
    })
    .catch(rej => {

    })
  }

  fnDelete(id){
    Swal.fire({
      title: 'Desea eliminar la direccion?',
      showConfirmButton: true,
      showDenyButton: true,
      denyButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((response) => {
      if(response.isDenied){
        this.addressService.fnDeleteAddress(id)
        .then(res => {
          Swal.fire({
            icon: 'success',
            title: 'Eliminada',
            text:'Se elimino la direccion correctamente',
            didClose: () => {
              this.fnLoadAddress();
            }
          })
        })
        .catch(rej => {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Algo salio mal',
            didClose: () => {
              this.router.navigate(["/store/address"]);
            }
          })
        });
      }
    })
  }

  fnEdit(id=0){
    this.router.navigate(["/store/address/edit",id]);
  }

}
