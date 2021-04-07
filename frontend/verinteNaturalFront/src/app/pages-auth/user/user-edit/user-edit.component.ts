import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UserTypesService } from '../../../services/user-types.service';
import { UserService } from '../../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Observable, Subscriber } from 'rxjs';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  arrayRoles = [];
  idUser;
  currentUser = {
    name : "",
    phone_number : "",
    email: "",
    user_type_id: "",
    id: this.idUser
  };

  //Show
  show;
  sub;

  editUserForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required,Validators.email]),
    phone_number: new FormControl(null, [Validators.required,Validators.minLength(5),Validators.maxLength(13)]),
    user_type_id: new FormControl(null, [Validators.required,Validators.maxLength(1)]),
    password: new FormControl(null, [Validators.required])
  });

  constructor(
    private userTypeService:UserTypesService,
    private userService:UserService,
    private route:ActivatedRoute,
    private router: Router
  ) { }

  state$: Observable<object>;

  ngOnInit(): void {
    this.idUser = this.route.snapshot.params.id;
    this.fnGetAllRoles();
    this.fnLoadUserInfo(this.idUser);

    //Editar o ver
    //this.show = this.route.snapshot.params.show;
    console.log('Antes de mapping');
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        console.log('Dentro de params');
        console.log(params);
        if(params.show === "true"){
          this.show = true;
        }
        else {
          this.show = false;
        }
      });
    //this.show = this.route.paramMap.pipe(map(() => window.history.state.show));
    console.log('Dentro de show');
    console.log(this.show);
    console.log(typeof this.show);

    
  }

  fnLoadUserInfo(id){
    this.userService.fnGetUserById(id)
    .then((resolve) => {
      this.currentUser = {
        name : resolve.data.name,
        phone_number : resolve.data.phone_number,
        email: resolve.data.email,
        user_type_id: resolve.data.user_type_id,
        id: this.idUser
      };
      console.log(this.currentUser.user_type_id);
    })
    .catch((reject)=>{
      console.log('Ocurrio un error al editar');
    });
  }

  numberOnly(event){
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  letterOnly(event){
    const charCode = (event.which) ? event.which : event.keyCode;
    if (!(charCode >= 65 && charCode <=120) && (charCode !=32 && charCode != 0)) {
      return false;
    }
    return true;
  }

  fnGetAllRoles(){
    this.userTypeService.fnGetUserTypes(null).
    then((resolve) => {
      //console.log(resolve);
      resolve.data.forEach(element => {
        this.arrayRoles.push(element);
      });
    })
    .catch((rej) => {
      console.log('Salio algo mal');
      console.log(rej);
    });
  }

  onSubmit(){

    console.log(this.editUserForm);

    let data = {
      name: (this.editUserForm.value.name != null) ? this.editUserForm.value.name : this.currentUser.name,
      phone_number: (this.editUserForm.value.phone_number != null ) ? this.editUserForm.value.phone_number: this.currentUser.phone_number,
      email: (this.editUserForm.value.email != null) ? this.editUserForm.value.email : this.currentUser.email,
      user_type_id: (this.editUserForm.value.user_type_id != null) ? this.editUserForm.value.user_type_id: this.currentUser.user_type_id,
      password: (this.editUserForm.value.password != null) ? this.editUserForm.value.password : null,
      id: this.currentUser.id
    };
    console.log(data);
    this.userService.fnUpdateUser(data)
    .then(resolve => {
      Swal.fire({
        icon: 'success',
        title: 'Realizado.',
        text: 'Se edito el usuario correctamente.',
        onAfterClose: () => {
          this.router.navigate(["system/user/control"]);
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

  change(){
    this.show = !this.show;
  }

}
