
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoginForm } from './loginForm';

@Injectable({
    providedIn: 'root'
})
export class LoginFormService {


    private loginForm: BehaviorSubject<FormGroup | undefined>;

    public loginForm$: Observable<FormGroup>;

    constructor(private fb: FormBuilder) {

    }

    public init() {
        this.loginForm = new BehaviorSubject(this.fb.group(
            new LoginForm()
        ));

        this.loginForm$ = this.loginForm.asObservable();
    }

    public reset() {
        this.loginForm.next(this.fb.group(
            new LoginForm()));
    }

    public destroy(): void {
        this.loginForm.next(undefined);
    }
}
