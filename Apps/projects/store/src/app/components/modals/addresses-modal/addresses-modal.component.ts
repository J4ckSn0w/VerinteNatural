import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AddressService } from 'services/Address/address.service'
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-addresses-modal',
  templateUrl: './addresses-modal.component.html',
  styleUrls: ['./addresses-modal.component.css']
})
export class AddressesModalComponent implements OnInit {

  fromParent: any;

  street: string
  number: string;
  zip_code: string;
  municipality_id: number = null;
  suburb: string;
  municipalities: any[] = [];
  state_id: number = null;
  states: any[] = [];
  errors: any[] = [];

  constructor(
    private modalService: NgbModal,
    private config: NgbModalConfig,
    public activeModal: NgbActiveModal,
    private addressService: AddressService,
    private toastr: ToastrService
  ) {
    this.config.backdrop = 'static';
  }

  ngOnInit(): void {
    this.showStates();
    this.getAddress();
  }


  onChangeState(event: any) {
    this.showMunicipalities();
  }


  // Show municipalities catalog
  showMunicipalities() {
    this.municipalities = [];
    if (this.state_id) {
      this.addressService.municipalities(this.state_id).then((res: any) => {
        this.municipalities = res.data

        if (!this.municipalities.find((e) => {
          return this.municipality_id == e.id
        })) this.municipality_id = null;

      }).catch(err => {
        console.log(err)
      })
    }
  }

  // Show states catalog
  showStates() {
    this.municipality_id = null;
    this.addressService.states().then((res: any) => {
      this.states = res.data
    }).catch(err => {
      console.log(err)
    })
  }

  // Store address
  onSubmit() {
    switch (this.fromParent.action) {
      case 'PUT': this.update(); break;
      case 'POST': this.store(); break;
    }
  }

  store() {
    this.addressService.store({
      street: this.street,
      zip_code: this.zip_code,
      number: this.number,
      suburb: this.suburb,
      state_id: this.state_id,
      municipality_id: this.municipality_id
    }).then((res: any) => {
      this.onClose();
      this.toastr.success('Dirección guardada', 'Excelente!')
    }).catch(err => {
      this.errors = err.error.errors;
    })
  }

  update() {
    this.addressService.update(this.fromParent.id, {
      street: this.street,
      zip_code: this.zip_code,
      number: this.number,
      suburb: this.suburb,
      state_id: this.state_id,
      municipality_id: this.municipality_id
    }).then((res: any) => {
      this.onClose();
      this.toastr.success('Dirección actualizada', 'Excelente!')
    }).catch(err => {
      this.errors = err.error.errors;
    })
  }

  onClose() {
    this.activeModal.close();
  }

  // Check if form have error
  checkError(field: string) {
    return this.errors[field] ?? false
  }

  // Get Address if action == 'GET'
  getAddress() {
    if (this.fromParent.action == 'PUT') {
      this.addressService.address(this.fromParent.id).then((res: any) => {
        this.state_id = res.data.state_id
        this.street = res.data.street;
        this.number = res.data.number;
        this.zip_code = res.data.zip_code;
        this.suburb = res.data.suburb;
        this.municipality_id = res.data.municipality_id;
        this.showMunicipalities();
      })
    }
  }

}
