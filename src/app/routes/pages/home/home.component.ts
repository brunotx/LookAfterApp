import { Component, OnInit } from '@angular/core';
import { BsModalService, ModalOptions, BsModalRef } from 'ngx-bootstrap/modal';
import { UserAddComponent } from '../user-add/user-add.component';
import { LoginComponent } from '../login/login.component';
// import { faFacebook } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public bsModalRef: BsModalRef;
  // public faFacebook = faFacebook;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  public openModal() {
    const options: ModalOptions = {
      class: 'modal-dialog modal-lg', initialState: {}, ignoreBackdropClick: true
    };
    this.bsModalRef = this.modalService.show(UserAddComponent, options);
  }

  public openLogin() {
    const options: ModalOptions = {
      class: 'modal-dialog modal-lg', initialState: {}, ignoreBackdropClick: false
    };
    this.bsModalRef = this.modalService.show(LoginComponent, options);
  }
}
