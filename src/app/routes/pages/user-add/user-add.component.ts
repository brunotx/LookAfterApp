import { Component, OnInit } from '@angular/core';
import { UserAddFormService } from './form/userAddForm.service';
import { FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {

  public userAddForm: FormGroup;
  public previousValues: any;
  public headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(
    private userAddFormService: UserAddFormService,
    private router: Router,
    private bsModalRef: BsModalRef,
    private httpService: HttpClient) { }

  ngOnInit() {

    this.userAddFormService.init(this.previousValues);
    this.userAddFormService.userAddForm$.subscribe(
      (form) => { this.userAddForm = form; }
    );
  }

  submitValues() {
    const formValues = this.userAddForm.value;
    const id = formValues.id;
    const data =  JSON.stringify(formValues);

    this.httpService.post<any>('http://localhost:8080/home', data, {headers: this.headers}).subscribe(
      (user) => {
        console.log(user);
        this.router.navigateByUrl('user/' + user.objectId);
        this.bsModalRef.hide();
      }
    );
  }

  hideModal() {
    this.bsModalRef.hide();
  }

}
