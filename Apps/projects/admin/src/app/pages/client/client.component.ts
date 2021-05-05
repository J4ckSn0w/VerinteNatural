import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbModule, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { UserService } from '../../../../../store/src/app/services/User/user.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  /*Modal Inicio*/
  newForm = new FormGroup({
    name: new FormControl(null,[Validators.required]),
    phone_number: new FormControl(null,[Validators.required]),
    email: new FormControl(null,[Validators.required, Validators.email]),
    rfc: new FormControl(null),
    password: new FormControl(null,[Validators.required])
  });

  currentView = 0;
  arrayViewsNames = ['Nuevo cliente','Editar cliente','Info tipo cliente'];

  show  = false;

  closeResult = '';

  errors = {

  }

  getDismissReason(reason:any):string{
    if(reason == ModalDismissReasons.ESC){
      return 'by pressing ESC';
    } else if (reason == ModalDismissReasons.BACKDROP_CLICK){
      return 'by clicking on a background';
    } else{
      return `with ${reason}`;
    }
  }

  fnCloseModal(){
    this.modalService.dismissAll();
    /**Funcion para cargar informacion despues de una modificacion */
    //this.fnLoadProductTypes();
    this.fnLoadClient();
  }

  fnOpenModal(){
    this.modalService.open(this.myModal).result.then((result) => {

    },(reason) => {
      this.getDismissReason(reason);
    })
  }

  @ViewChild('myModal') myModal:ElementRef;

  tableLoad = false;

  /**Modal Final */

  //New Client
  error_email = false;
  error_phone_number = false;
  error_rfc = false;
  arrayClients = [];

  idClient;
  currentClient = {
    name : "",
    phone_number : "",
    customer : {rfc : ""},
    password : "",
    email: "",
    user_id:'',
    id:'',
    employee_type_id:''
  };

  constructor(
    private clientService: ClientService,
    private router: Router,
    private modalService: NgbModal,
    
  ) { }

  /**Paginate the table */

  tableLoaded = false;

  loadingIndicator = true;
  reorderable = true;
  rows = [
    { name: 'Austin', gender: 'Male', company: 'Swimlane' },
    { name: 'Dany', gender: 'Male', company: 'KFC' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' }
  ];
  columns = [{ prop: 'name' }, { name: 'Gender' }, { name: 'Company' }];

  ngOnInit(): void {
    this.fnLoadClient();
  }

  fnEdit(id){
    this.show = false;
    this.fnLoadClientInfo(id);
  }

  fnDelete(id){
    Swal.fire({
    icon:'info',
    title: 'Eliminar',
    text: 'Desea eliminar este cliente?',
    showConfirmButton: true,
    showDenyButton: true,
    confirmButtonText: `No`,
    denyButtonText: `Si`,

  }).then((result) => {
    if(result.isDenied){
      this.clientService.fnDeleteClient(id)
      .then(res => {
        Swal.fire('Se elimino el cliente correctamente.', '', 'success');
        this.fnLoadClient();
      })
      .catch(rej => {
        Swal.fire('Ocurrio un error.', '', 'error')
      })
    }
  })
  }
  
  fnVer(id){
    console.log('ENTRE A VER');
    this.show = true;
    this.fnLoadClientInfo(id);
  }

  fnLoadClient(){
    this.arrayClients = [];
    this.clientService.fnGetAllUSers()
    .then(res => {
      res.data.forEach(element => {
        this.arrayClients.push(element);
      });
      this.tableLoad = true;
    })
    .then(rej => {
    })
  }

  fnLoadClientInfo(id){
    this.clientService.fnGetClientById(id)
    .then(res => {
      this.currentClient = res.data;
      console.log('Dentro de LoadInfo');
      console.log(this.currentClient);
      this.currentView = 1;
      this.fnOpenModal();
    })
    .catch(rej => {

    });
  }

  fnNew(){
    this.currentView = 0;
    this.newForm.reset();
    this.fnOpenModal();
  }

  onSubmitNew(){
    let data = {
      user_id:this.currentClient.user_id,
      name:this.newForm.value.name,
      email:this.newForm.value.email,
      phone_number:this.newForm.value.phone_number,
      password:this.newForm.value.password,
      password_confirmation:this.newForm.value.password,
      rfc:this.newForm.value.rfc
    };
    console.log('ANTES DE CONSUMIR SERVICIO');
    console.log(data);
    this.clientService.fnPostNewClient(data)
    .then(res => {
      Swal.fire({
        icon:'success',
        title:'Se creo el cliente correctamente',
        didClose: () =>{
          //this.fnLoadClient();
          this.fnCloseModal();
        }
      });
    })
    .catch(rej => {
      console.log('ERRORES');
      console.log(rej);
      this.errors = rej.error.errors;
      // if(this.errors.email){
      //   this.error_email = true;
      // }
      // if(this.errors.phone_number){
      //   this.error_phone_number = true;
      // }
      // if(this.errors.rfc){
      //   this.error_rfc = true;
      // }
    });
  }

  fnCheckErrors(cadena){
    return this.errors[cadena] ?? false;
  }

  onSubmitEdit(){
    this.error_phone_number = false;
    this.error_email = false;
    this.error_rfc = false;

    let data = {
      id:this.currentClient.id,
      user_id:this.currentClient.user_id,
      name:(this.newForm.value.name == undefined) ? this.currentClient.name : this.newForm.value.name,
      email:(this.newForm.value.email == undefined) ? this.currentClient.email : this.newForm.value.email,
      phone_number:(this.newForm.value.phone_number == undefined) ? this.currentClient.phone_number : this.newForm.value.phone_number,
      employee_type_id:(this.newForm.value.employee_type_id == undefined) ? this.currentClient.employee_type_id : this.newForm.value.employee_type_id
    }

    this.clientService.fnEditUser(data)
    .then( res => {
      Swal.fire({
        icon: 'success',
        title: 'Correcto!',
        text:'Se edito el cliente correctamente',
        didClose: () => {
          this.fnCloseModal();
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
