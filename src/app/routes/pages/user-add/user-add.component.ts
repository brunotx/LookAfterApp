import { Component, OnInit } from '@angular/core';
import { UserAddFormService } from './form/userAddForm.service';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {

  public userAddForm: FormGroup;
  public previousValues: any;

  constructor(
    private userAddFormService: UserAddFormService,
    private router: Router,
    private bsModalRef: BsModalRef) { }

  ngOnInit() {

    this.userAddFormService.init(this.previousValues);
    this.userAddFormService.userAddForm$.subscribe(
      (form) => { this.userAddForm = form; }
    );
  }

  submitValues() {
    const formValues = this.userAddForm.controls;
    const id = formValues.id.value;
    this.router.navigateByUrl('/user/' + id);
  }

  hideModal() {
    this.bsModalRef.hide();
  }

}
