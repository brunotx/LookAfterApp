import { FormControl, Validators } from '@angular/forms';

export class LoginForm {

    email = new FormControl();
    password = new FormControl();

    constructor() {
        this.email.setValidators(Validators.compose([Validators.required, Validators.email]));
        this.password.setValidators(Validators.required);
    }
}
