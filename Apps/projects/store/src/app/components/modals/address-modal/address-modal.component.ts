import { Component, NgModule, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-address-modal',
  templateUrl: './address-modal.component.html',
  styleUrls: ['./address-modal.component.css']
})
export class AddressModalComponent implements OnInit {

  title: string = '';
  fromParent: any;

  constructor(
    private modalService: NgbModal,
    private config: NgbModalConfig,
    public activeModal: NgbActiveModal
  ) {
    this.config.backdrop = 'static';
  }

  ngOnInit(): void {
  }

}
