import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-session-modal',
  templateUrl: './session-modal.component.html',
  styleUrls: ['./session-modal.component.css']
})
export class SessionModalComponent implements OnInit {
  currentComponent: number;
  tabs: any[] = [
    { title: "Iniciar Sesión", idComponent: 0 },
    { title: "Crear cuenta nueva", idComponent: 1 },
    { title: "Recupera tu cuenta", idComponent: 2 }
  ]

  constructor(
    private modalService: NgbModal,
    private config: NgbModalConfig,
    public activeModal: NgbActiveModal
  ) {
    this.config.backdrop = 'static';
    this.currentComponent = 0
  }

  open(modal: String) {
    const modalRef = this.modalService.open(modal);
  }

  ngOnInit(): void {
    this.currentComponent = 0
  }

  changeComponent(event: any) {
    this.currentComponent = event
  }

}
