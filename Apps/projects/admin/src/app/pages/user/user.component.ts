import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserTypesService } from '../../services/user-types.service';
import { WarehouseService } from '../../services/warehouse.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  error_email = false;
  error_phone_number = false;

  arrayRoles = [];
  arrayWarehouses = [];
  arrayDriversTypes = [];

  newUserForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    phone_number: new FormControl(null, [Validators.required,Validators.minLength(5),Validators.maxLength(13)]),
    email: new FormControl(null, [Validators.required,Validators.email]),
    password: new FormControl(null, [Validators.required]),
    user_type: new FormControl(1, Validators.required),
    warehouse_id: new FormControl(null,[Validators.required])
  });

  //Modal
  closeResult = '';

  arrayUser = [];

  constructor(
    private router:Router,
    private userService: UserService,
    private modalService: NgbModal,
    private userTypeService: UserTypesService,
    private warehouseService: WarehouseService
  ) { }

  ngOnInit(): void {
    this.fnGetAllUser();
  }

  fnGetAllRoles(){
    this.arrayRoles = [];
    this.arrayDriversTypes = [];
    this.arrayWarehouses = [];
    //this.userTypeService.fnGetUserTypes(null).
    this.userTypeService.fnGetEmployeesTypes()
    .then((resolve) => {
      console.log(resolve);
      resolve.data.forEach(element => {
        this.arrayRoles.push(element);
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
  }

  fnGetAllUser(){
    this.arrayUser = [];
    this.userService.fnGetUsers()
    .then((resolve) => {
      resolve.data.forEach(element => {
        this.arrayUser.push(element);
      });
    })
    .catch(reject => {
      console.log('reject' + reject);
    })
  }

  fnEdit(){}
  fnVer(){}
  fnDelete(){}

  fnNew(content){
    this.fnGetAllRoles();
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

  fnCloseModal(myModal){
  }

  onSubmitNew(){
    let data = {
        "name": this.newUserForm.value.name,
        "email": this.newUserForm.value.email,
        "phone_number": this.newUserForm.value.phone_number,
        "password": this.newUserForm.value.password,
        "user_type_id": this.newUserForm.value.user_type
      };
      Swal.showLoading();
    
      this.userService.fnPostNewUserA(data)
      .then((resolve) => {
        Swal.hideLoading();
        Swal.fire({
          icon: 'success',
          title: 'Se registro correctamente!',
          onAfterClose: () => {
            this.router.navigate(["system/user/control"]);
          }
        });
      })
      .catch((reject) => {
        Swal.hideLoading();
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un error!'
        });
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

}
