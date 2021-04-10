import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SessionModalComponent } from 'components/modals/session-modal/session-modal/session-modal.component'
import { SessionService } from 'services/Session/session.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() isLogged: any;

  constructor(
    private modalService: NgbModal,
    private sessionService: SessionService
  ) { }

  ngOnInit(): void { }

  open() {
    const modalRef = this.modalService.open(SessionModalComponent);
  }

  logout() {
    this.sessionService.logout()
  }

}
