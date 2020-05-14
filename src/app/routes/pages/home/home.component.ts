import { Component, OnInit } from '@angular/core';
import { BsModalService, ModalOptions, BsModalRef } from 'ngx-bootstrap/modal';
import { UserAddComponent } from '../user-add/user-add.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  public openModal() {
    // modal Options
    const options: ModalOptions = {
      class: 'modal-dialog modal-lg', initialState: {}, ignoreBackdropClick: true
    };
    this.bsModalRef = this.modalService.show(UserAddComponent, options);

  }
}
