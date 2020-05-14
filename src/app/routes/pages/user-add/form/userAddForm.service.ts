
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserAddForm } from './userAddForm';

@Injectable({
    providedIn: 'root'
})
export class UserAddFormService {


    private userAddForm: BehaviorSubject<FormGroup | undefined>;

    public userAddForm$: Observable<FormGroup>;

    constructor(private fb: FormBuilder) {

    }

    public init(startupValues) {
        this.userAddForm = new BehaviorSubject(this.fb.group(
            new UserAddForm(startupValues)
        ));

        this.userAddForm$ = this.userAddForm.asObservable();
    }

    public reset() {
        this.userAddForm.next(this.fb.group(
            new UserAddForm(undefined)));
    }

    public destroy(): void {
        this.userAddForm.next(undefined);
    }
}
