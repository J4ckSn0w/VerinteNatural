import { Component, OnInit } from '@angular/core';
import { AddressModalComponent } from 'components/modals/address-modal/address-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  open() {
    const modalRef = this.modalService.open(AddressModalComponent);
  }


}
