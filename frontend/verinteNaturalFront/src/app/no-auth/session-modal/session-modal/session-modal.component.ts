import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-session-modal',
  templateUrl: './session-modal.component.html',
  styleUrls: ['./session-modal.component.css']
})
export class SessionModalComponent implements OnInit {
  currentComponent: number;
  tabs: object[] = [
    { title: "Iniciar Sesión", idComponent: 0 },
    { title: "Crear cuenta", idComponent: 1 },
    { title: "Recuperar cuenta", idComponent: 2 }
  ]

  constructor(private modalService: NgbModal, private config: NgbModalConfig) {
    config.backdrop = 'static';
  }

  open(modal: String) {
    const modalRef = this.modalService.open(modal);
    this.currentComponent = 0
  }

  ngOnInit(): void {
    this.currentComponent = 0
  }

  changeComponent(event: any) {
    this.currentComponent = event
  }

}
