import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserAddFormService } from './form/userAddForm.service';
import { FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsersModel } from '../../../../assets/models/usersModel';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit, OnDestroy {

  public userAddForm: FormGroup;
  public previousValues: any;
  public users: UsersModel[] = [];
  public headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  public errorAddUser: boolean = false;
  public errorMsg: string;
  public getUserService_: Subscription;
  public userForm_: Subscription;

  constructor(
    private userAddFormService: UserAddFormService,
    private router: Router,
    private bsModalRef: BsModalRef,
    private httpService: HttpClient) { }

  ngOnInit() {
    this.users = JSON.parse(localStorage.getItem('users'));

    this.userAddFormService.init(this.previousValues);
    this.userForm_ = this.userAddFormService.userAddForm$.subscribe(
      (form) => { this.userAddForm = form; }
    );
  }

  ngOnDestroy() {
    if (this.getUserService_ !== undefined) { this.getUserService_.unsubscribe(); }
    if (this.userForm_ !== undefined) { this.userForm_.unsubscribe(); }

  }


  submitValues() {
    const formValues = this.userAddForm.value;
    const id = formValues.id;
    const data = JSON.stringify(formValues);

    this.getUserService_ = this.httpService.post<any>('http://localhost:8080/home', data, { headers: this.headers }).subscribe(
      (user) => {
        if (user.code === 202) {
          this.errorAddUser = true;
          this.errorMsg = user.message;
          return;
        }
        this.users.push(user);
        localStorage.setItem('users', JSON.stringify(this.users));
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigateByUrl('user/' + user.objectId);
        this.bsModalRef.hide();
      }
    );
  }

  hideModal() {
    this.bsModalRef.hide();
  }

}
