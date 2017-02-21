import { Component } from '@angular/core';

import {Validators, FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'page-password',
  templateUrl: 'password.html'
})
export class PasswordPage {
passwordData: FormGroup;

  constructor(private formBuilder: FormBuilder) {
	this.passwordData = this.formBuilder.group({
        password: ['', Validators.required]
      });
  }

  openCategory() {
  }
}
