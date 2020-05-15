import { FormControl, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';

export class UserAddForm {

    id = new FormControl();
    fullName = new FormControl();
    email = new FormControl();
    phone = new FormControl();
    password = new FormControl();
    date = new FormControl();

    constructor(startupValues: any) {

        this.fullName.setValidators(Validators.compose([Validators.required, Validators.minLength(3)]));
        this.email.setValidators(Validators.compose([Validators.required, Validators.email]));
        this.password.setValidators(Validators.required);
        this.phone.setValidators(Validators.compose([Validators.required, Validators.minLength(9), Validators.maxLength(9)]));

        if (startupValues === undefined) {
            this.id.setValue(Guid.create().toString());
            this.date.setValue(new Date());
            return;
        }
        for (const prop in startupValues) {
            if (this[prop.toString()] === undefined) { continue; }
            (this[prop.toString()] as unknown as FormControl).setValue(startupValues[prop.toString()]);
        }
    }
}
