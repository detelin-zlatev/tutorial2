import { Component } from '@angular/core';

import { NavController, PopoverController, LoadingController  } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import {CategoryPage} from '../category/category';
import {PasswordPage} from '../password/password';
import {EmailPage} from '../email/email';

import {CategoriesService} from '../../providers/categories-service';

@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
  providers: [CategoriesService]
})
export class CategoriesPage {
  constructor(public storage: Storage, public navCtrl: NavController, public categoriesService: CategoriesService, private formBuilder: FormBuilder, public popoverCtrl: PopoverController, public loadingController: LoadingController ) {
    this.categoryData = this.formBuilder.group({
      category: ['', Validators.required]
    });
    this.storage.get('email').then((email) => {
      if (email == null) {
        console.log(email);
        this.navCtrl.push(EmailPage);
      } else {
        this.loadCategories();
      }
    });
    
    
  }

  public categoryData: FormGroup;
  public categories: any;

  openCategory() {
    let hasPassword = false;
    for (let category of this.categories) {
    	if (category.id == this.categoryData.controls['category'].value) {
		    hasPassword = category.passwd;
		    break;
	    }
    }

    if(!hasPassword) {
    	this.navCtrl.push(CategoryPage, {
    	   categoryId: this.categoryData.controls['category'].value
    	});
    } else {
      let passPopover = this.popoverCtrl.create(PasswordPage, {id: this.categoryData.controls['category'].value});
      passPopover.present();
    }
  }

  loadCategories() {
      let loader = this.loadingController.create({
	      content: "Зарежда..."
	    });
      loader.present();
      this.categoriesService.all()
      .then(data => {
        this.categories = data.categories;  
	      loader.dismiss();
      });
  }
}
