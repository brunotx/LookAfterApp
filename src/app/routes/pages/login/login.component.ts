import { Component, OnInit } from '@angular/core';
import { LoginFormService } from './form/loginForm.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(private loginFormService: LoginFormService) { }

  ngOnInit() {
    this.loginFormService.init();
    this.loginFormService.loginForm$.subscribe(
      (form) => {
      this.loginForm = form;
      }
    );
  }

  submitValues() {
    const fomValues = this.loginForm.controls;
    console.log(fomValues);
  }

}
