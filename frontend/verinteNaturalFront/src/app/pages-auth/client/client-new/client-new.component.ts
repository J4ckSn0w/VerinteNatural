import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ClientService } from '../../../services/client.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-new',
  templateUrl: './client-new.component.html',
  styleUrls: ['./client-new.component.css']
})
export class ClientNewComponent implements OnInit {

  error_email = false;
  error_phone_number = false;
  error_rfc = false;

  newClientForm = new FormGroup({
    name: new FormControl(null,[Validators.required]),
    phone_number: new FormControl(null,[Validators.required]),
    email: new FormControl(null,[Validators.required, Validators.email]),
    rfc: new FormControl(null,[Validators.required, Validators.minLength(8),Validators.maxLength(13)]),
    password: new FormControl(null,[Validators.required])
  });

  constructor(
    private clientService: ClientService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.error_email = false;
    this.error_rfc = false;
    this.error_phone_number = false;
    
    let data = {
      name: this.newClientForm.value.name,
      phone_number: this.newClientForm.value.phone_number,
      email: this.newClientForm.value.email,
      rfc: this.newClientForm.value.rfc,
      password: this.newClientForm.value.password,
      password_confirmation: this.newClientForm.value.password
    };
    this.clientService.fnPostNewClient(data)
    .then(res => {
      Swal.fire({
        icon:'success',
        title:'Se creo el cliente correctamente',
        didClose: () =>{
          this.router.navigate(['/system/client']);
        }
      });
    })
    .catch(rej => {
      let errors = rej.error.errors;
      if(errors.email){
        this.error_email = true;
      }
      if(errors.phone_number){
        this.error_phone_number = true;
      }
      if(errors.rfc){
        this.error_rfc = true;
      }
    });
  }

}
