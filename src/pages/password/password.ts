import { Component } from '@angular/core';

import { NavController, NavParams, ViewController} from 'ionic-angular';

import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import {CategoryPage} from '../category/category';

import {CategoriesService} from '../../providers/categories-service';


@Component({
  selector: 'page-password',
  templateUrl: 'password.html',
  providers: [CategoriesService]
})

export class PasswordPage {
  id: number;
  passwordData: FormGroup;
  submitAttempt: boolean;
  loginValid: boolean;

  constructor(private formBuilder: FormBuilder, public categoriesService: CategoriesService, public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
	    this.passwordData = this.formBuilder.group({
        password: ['', Validators.required]
      });
      this.id = navParams.get('id');
  }

  openCategory() {
    this.submitAttempt = true;
    this.loginValid = true;
    this.categoriesService.single(this.id, this.passwordData.controls['password'].value)
      .then(data => {
        if (data != null) {
            this.viewCtrl.dismiss();
            this.navCtrl.push(CategoryPage, {
              categoryId: this.id
            });
        } else {
		this.loginValid = false;	
	}
      });
  }
}
