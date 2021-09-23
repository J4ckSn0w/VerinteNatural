import { Component, OnInit } from '@angular/core';
import { AddressesModalComponent } from 'components/modals/addresses-modal/addresses-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddressService } from 'services/Address/address.service';
import { NgPopupsService } from 'ng-popups';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {

  addresses: any[] = []

  constructor(
    private modalService: NgbModal,
    private addressService: AddressService,
    private ngPopups: NgPopupsService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAddresses()
  }

  getAddresses() {
    this.addressService.addresses().then((res: any) => {
      this.addresses = res.data;
    }).catch(err => {
      console.log(err)
    })
  }

  open(params: any) {
    const modalRef = this.modalService.open(AddressesModalComponent);
    modalRef.componentInstance.fromParent = params;
    modalRef.closed.toPromise().then(res => {
      this.reloadTable();
    })
  }

  // Reaload Table of addresses
  reloadTable() {
    this.getAddresses();
  }

  // Delete address
  delete(id: number) {

    this.ngPopups.confirm('Estas a punto de eliminar esta dirección, ¿Estas seguro?', {
      okButtonText: 'Eliminar',
      cancelButtonText: 'No',
      title: 'Elimiar dirección'
    }).subscribe(res => {
      if (res) {
        this.addressService.delete(id).then((res: any) => {
          this.reloadTable();
          this.toastr.success('Se eliminó la dirección', 'Excelente!')
        }).catch(err => {
          this.toastr.error('Algo salió mal', 'Intentalelo más tarde!')
          console.log(err)
        })
      } else {
        console.log('You clicked Cancel. You smart.');
      }
    });
  }

}
