import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientService } from '../../../services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit {

  sub;
  show;

  idClient;
  currentClient = {
    name : "",
    phone_number : "",
    customer : {rfc : ""},
    password : "",
    email: ""
  };

  error_phone_number = false;
  error_email = false;
  error_rfc = false;

  constructor(
    private clientService: ClientService,
    private route:ActivatedRoute,
    private router:Router
  ) { }

  editClientForm = new FormGroup({
    name: new FormControl(null,[Validators.required]),
    phone_number: new FormControl(null,[Validators.required]),
    email: new FormControl(null,[Validators.required, Validators.email]),
    rfc: new FormControl(null,[Validators.required]),
    password: new FormControl(null,[Validators.required])
  });

  ngOnInit(): void {
    this.idClient = this.route.snapshot.params.id;
    this.fnLoadClientInfo();

    //Show or edit
    this.sub = this.route.queryParams.subscribe(params => {
      if(params.show == "true"){
        this.show = true;
        console.log(this.show);
      }
      else{
        this.show = false;
        console.log(this.show);
      }
    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.sub.unsubscribe();
  }

  fnLoadClientInfo(){
    this.clientService.fnGetClientById(this.idClient)
    .then( res => {
      this.currentClient = res.data;
      console.log(res);
    } )
    .catch( rej => {
      console.log(rej);
    });
  }

  onSubmit(){
    this.error_phone_number = false;
    this.error_email = false;
    this.error_rfc = false;
    let data = {
      name: (this.editClientForm.value.name == undefined) ? this.currentClient.name : this.editClientForm.value.name,
      phone_number: (this.editClientForm.value.phone_number == undefined ) ? this.currentClient.phone_number : this.editClientForm.value.phone_number,
      email: (this.editClientForm.value.email == undefined ) ? this.currentClient.email : this.editClientForm.value.email,
      rfc: (this.editClientForm.value.rfc == undefined ) ? this.currentClient.customer.rfc : this.editClientForm.value.rfc,
      id: this.idClient
    };
    this.clientService.fnEditUser(data)
    .then( res => {
      Swal.fire({
        icon: 'success',
        title: 'Correcto!',
        text:'Se edito el cliente correctamente',
        didClose: () => {
          this.router.navigate(["/system/client"]);
        }
      })
    })
    .catch( rej => {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Algo salio mal.',
      });
      console.log(rej);
      
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
