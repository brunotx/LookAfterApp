import { Component, OnInit } from '@angular/core';
import { LoginFormService } from './form/loginForm.service';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public getAllUsers = [];
  public currentUser;
  public errorLogin: boolean = false;

  constructor(private loginFormService: LoginFormService,
    private router: Router,
    private bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.loginFormService.init();
    this.loginFormService.loginForm$.subscribe(
      (form) => {
        this.loginForm = form;
      }
    );

    this.getAllUsers = JSON.parse(localStorage.getItem('users'));

  }

  submitValues() {
    const fomValues = this.loginForm.value;
    this.currentUser = this.getAllUsers.find(x => x.email === fomValues.email && x.password === fomValues.password);
    if (this.currentUser !== undefined && this.currentUser !== null) {
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      this.router.navigateByUrl('user/' + this.currentUser.objectId);
      this.bsModalRef.hide();
      return;
    }
    this.errorLogin = true;
  }

}
