import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-control',
  templateUrl: './user-control.component.html',
  styleUrls: ['./user-control.component.css']
})
export class UserControlComponent implements OnInit {

  arrayUser = [];

  constructor(
    private router:Router,
    private userService: UserService
  ) { 
    console.log('Entre al constructor de user-control');
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

  ngOnInit(): void {
    this.fnGetAllUser();
  }

  fnEdit(id = 0){
    let show = false;
    this.router.navigate(['/system/user/edit',id],{ queryParams: { show: show } ,  skipLocationChange: true});
  }

  fnDelete(id = 0){ 
    Swal.fire({
      title: 'Eliminar usuario?',
      showDenyButton: true,
      confirmButtonText: `No`,
      denyButtonText: `Si`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        //Swal.fire('Saved!', '', 'success')
      } else if (result.isDenied) {
        /*console.log(this.arrayUser.length);
        this.arrayUser.splice(id,1);
        console.log(this.arrayUser.length);*/
        this.userService.fnDeleteUser(id)
        .then(resolve => {    
          this.fnGetAllUser();
        })
        .catch(reject => {
          
        })
        Swal.fire('Se elimino el usuario correctamente', '', 'success')
      }
    });
  }

  fnVer(id = 0){
    let show = true;
    this.router.navigate(['/system/user/edit',id], { queryParams: { show: show } ,  skipLocationChange: true });
  }

}
