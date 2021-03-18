import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../services/client.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client-control',
  templateUrl: './client-control.component.html',
  styleUrls: ['./client-control.component.css']
})
export class ClientControlComponent implements OnInit {

  arrayClients = [];

  constructor(
    private clientService: ClientService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fnLoadClient();
  }

  fnLoadClient(){
    this.arrayClients = [];
    this.clientService.fnGetAllUSers()
    .then(res => {
      res.data.forEach(element => {
        this.arrayClients.push(element);
      });
      console.log(res);
    })
    .catch(rej => {
      console.log('Error en loadClient');
    });
  }

  fnDelete(id = 0){
    Swal.fire({
      icon:'info',
      title: 'Eliminar',
      text: 'Desea eliminar este cliente?',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: `No`,
      denyButtonText: `Si`,

    }).then((result) => {
      if(result.isConfirmed){

      } else {
        this.clientService.fnDeleteClient(id)
        .then(res => {
          Swal.fire('Se elimino el usuario correctamente.', '', 'success');
          this.fnLoadClient();
        })
        .catch(rej => {
          Swal.fire('Ocurrio un error.', '', 'error')
        })
      }
    })
  }

  fnEdit(id = 0){
    this.router.navigate(['/system/client/edit',id]);
  }
}
