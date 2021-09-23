import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserTypesService } from '../../services/user-types.service';
import { WarehouseService } from '../../services/warehouse.service';
import Swal from 'sweetalert2';
import { RolesService } from '../../services/roles.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @ViewChild('EditUserModal', { static: true }) input: ElementRef;
  @ViewChild('NewUserModal', { static: true }) myModal: ElementRef;

  tableLoad = false;

  currentView = 0;

  arrayViewsNames = ['Nuevo Usuario','Editar Usuario','Info Usuario'];

  error_email = false;
  error_phone_number = false;

  errors = []

  show  = false;

  arrayRoles = [];
  arrayUserTypes = [];
  arrayWarehouses = [];
  arrayDriversTypes = [];

  currentUser = {
    name:'',
    phone_number:'',
    email:'',
    password:'',
    employee_type:{
      id:''
    },
    warehouse:{
      id:''
    },
    id:'',
    user_id:'',
    employee_number:'',
    role:{
      name:'',
      title:''
    }
  }

  newUserForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    phone_number: new FormControl(null, [Validators.required,Validators.minLength(5),Validators.maxLength(13)]),
    email: new FormControl(null, [Validators.required,Validators.email]),
    password: new FormControl(null, [Validators.required]),
    employee_type_id: new FormControl(1, Validators.required),
    warehouse_id: new FormControl(null,[Validators.required]),
    role: new FormControl(null,[Validators.required])
  });

  fnLoadInfoForm(data){
    console.log('LOAD INFO FORM');
    this.newUserForm.value.name = data.name,
    this.newUserForm.value.phone_number = data.phone_number,
    this.newUserForm.value.email = data.email,
    this.newUserForm.value.employee_type_id = data.employee_type.id,
    this.newUserForm.value.warehouse_id = data.warehouse.id,
    this.newUserForm.value.role = data.role

    console.log(this.newUserForm);
  }

  //Modal
  closeResult = '';

  arrayUser = [];

  constructor(
    private router:Router,
    private userService: UserService,
    private modalService: NgbModal,
    private userTypeService: UserTypesService,
    private warehouseService: WarehouseService,
    private rolesService: RolesService
  ) { }

  ngOnInit(): void {
    this.fnGetAllUser();
    this.fnGetAllRoles();
  }

  fnGetAllRoles(){
    this.arrayRoles = [];
    this.arrayUserTypes = [];
    this.arrayDriversTypes = [];
    this.arrayWarehouses = [];
    //this.userTypeService.fnGetUserTypes(null).
    this.userTypeService.fnGetEmployeesTypes()
    .then((resolve) => {
      console.log(resolve);
      resolve.data.forEach(element => {
        this.arrayUserTypes.push(element);
      });
    })
    .catch((rej) => {
      console.log('Salio algo mal');
      console.log(rej);
    });
    this.warehouseService.fnGetWarehouses()
    .then(res => {
      res.data.forEach(element => {
        this.arrayWarehouses.push(element);
      })
    })
    .catch(rej => {
      console.log('Algo salio mal al cargar los almacenes');
    });
    /*Roles */
    this.rolesService.fnGetRoles()
    .then(res => {
      res.data.forEach(element => {
        this.arrayRoles.push(element);
      });
      /*console.log('Roles');
      console.log(res.data);*/
    })
    .catch(rej => {
      console.log('Algo salio mal al traer los roles');
      console.log(rej);
    })
  }

  fnGetAllUser(){
    this.arrayUser = [];
    this.userService.fnGetUsers()
    .then((resolve) => {
      console.log('resolve');
      console.log(resolve);
      resolve.data.forEach(element => {
        this.arrayUser.push(element);
      });
      this.tableLoad = true;
      console.log(this.arrayUser);
    })
    .catch(reject => {
      console.log('reject');
      console.log(reject);
    })
  }

  fnEdit(id){
    this.newUserForm.reset();
    /*console.log('Roles');
    console.log(this.arrayRoles);*/
    this.userService.fnGetUserById(id)
    .then(res => {
      console.log('INFO');
      console.log(res.data);
      this.currentUser = res.data;
    })
    .catch(rej => {
      console.log('Error al traer informacion de usuario');
    });
    this.currentView = 1;
    this.show = false;
    this.modalService.open(this.myModal).result.then((result) => {
    },(reason) => {
      this.getDismissReason(reason);
    });
  }

  fnVer(id){
    /*console.log('Roles');
    console.log(this.arrayRoles);*/
    this.newUserForm.reset();
    this.userService.fnGetUserById(id)
    .then(res => {
      console.log('INFO');
      console.log(res.data);
      this.currentUser = res.data;
      this.fnLoadInfoForm(this.currentUser);
    })
    .catch(rej => {
    });
    this.currentView = 1;
    this.show = true;
    this.modalService.open(this.myModal).result.then((result) => {
    },(reason) => {
      this.getDismissReason(reason);
    });
  }

  fnDelete(id){
    Swal.fire({
      icon:'warning',
      title:'Eliminar',
      text:'Desea eliminar el usuario?',
      showDenyButton:true,
      denyButtonText:'Si',
      confirmButtonText:'No'
    }).then(result => {
      if(result.isDenied){
        this.userService.fnDeleteUser(id)
        .then(res => {
          Swal.fire({
            icon:'success',
            title:'Correcto',
            text:'Se elimino el usuario correctamente',
            didClose:() => {
              this.fnGetAllUser();
            }
          })
        })
        .catch(rej => {
          Swal.fire({
            icon:'error',
            title:'Error',
            text:'Hubo un error al intentar eliminar el usuario'
          });
        })
      }
    })
  }

  fnNew(content){
    this.errors = [];
    this.currentView = 0;
    this.newUserForm.reset();
    console.log('Ando por aca');
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Close with: ${result}`;
    },(reason) => {
      this.closeResult = `Dismiss ${this.getDismissReason(reason)}`
    })
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
  }

  onSubmitNew(){
    this.errors = [];
    let data = {
        "name": this.newUserForm.value.name,
        "email": this.newUserForm.value.email,
        "phone_number": this.newUserForm.value.phone_number,
        "password": this.newUserForm.value.password,
        "employee_type_id": this.newUserForm.value.employee_type_id,
        "warehouse_id":this.newUserForm.value.warehouse_id,
        role: {
          name:this.newUserForm.value.role.name,
          title:this.newUserForm.value.role.title
        }
      };
      console.log('Data');
      console.log(data);
      Swal.showLoading();
    
      this.userService.fnPostNewUserA(data)
      .then((resolve) => {
        Swal.hideLoading();
        Swal.fire({
          icon: 'success',
          title: 'Se registro correctamente!',
          onAfterClose: () => {
            //this.router.navigate(["system/user/control"]);
            this.fnGetAllUser();
            this.fnCloseModal();
          }
        });
      })
      .catch((reject) => {
        Swal.hideLoading();
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un error!'
        });
        this.errors = reject.error.errors;
        let errors = reject.error.errors;
        console.log(reject);
        if(errors.email){
          this.error_email = true;
        }
        if(errors.phone_number){
          this.error_phone_number = true;
        }
      });
  }

  onSubmitEdi(){
    let data = {
      name: (this.newUserForm.value.name != null) ? this.newUserForm.value.name : this.currentUser.name,
      phone_number: (this.newUserForm.value.phone_number != null ) ? this.newUserForm.value.phone_number: this.currentUser.phone_number,
      email: (this.newUserForm.value.email != null) ? this.newUserForm.value.email : this.currentUser.email,
      employee_type_id: (this.newUserForm.value.employee_type_id != null) ? this.newUserForm.value.employee_type_id: this.currentUser.employee_type.id,
      password: (this.newUserForm.value.password != null) ? this.newUserForm.value.password : null,
      warehouse_id:(this.newUserForm.value.warehouse_id != null) ? this.newUserForm.value.warehouse_id : this.currentUser.warehouse.id,
      id: this.currentUser.id,
      user_id: this.currentUser.user_id,
      role:{
        name:(this.newUserForm.value.role != null) ? this.newUserForm.value.role : this.currentUser.role
      }
    };
    console.log(data);
    this.userService.fnUpdateUser(data)
    .then(resolve => {
      Swal.fire({
        icon: 'success',
        title: 'Realizado.',
        text: 'Se edito el usuario correctamente.',
        onAfterClose: () => {
          //this.router.navigate(["system/user/control"]);
          this.fnGetAllUser();
          this.modalService.dismissAll();
        }
      });
    })
    .catch(reject => {
      Swal.fire({
        icon:'error',
        title:'Error!',
        text:'Algo salio mal!'
      })
    });
  }

  fnCheckErrors(cadea){
    console.log('Entre con');
    console.log(cadea);
    console.log(this.errors);
    return this.errors[cadea] ?? false;
  }
}