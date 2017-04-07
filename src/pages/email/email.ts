import { Component } from '@angular/core';

import { Storage } from '@ionic/storage';

import { NavController, LoadingController  } from 'ionic-angular';

import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import {EmailsService} from '../../providers/emails-service';

@Component({
  selector: 'page-email',
  templateUrl: 'email.html',
  providers: [EmailsService]
})
export class EmailPage {
  public emailData: FormGroup;
  public submitAttempt: boolean;

  constructor(public storage: Storage, public navCtrl: NavController, public emailService: EmailsService, private formBuilder: FormBuilder, public loadingController: LoadingController ) {
    //let emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
    
    this.emailData = this.formBuilder.group({
      email: ['', [Validators.required]]
    });
  }

  addEmail() {
    this.submitAttempt = true;
    let loader = this.loadingController.create({
      content: "Зарежда..."
    });
    loader.present();

    this.storage.set('phone', this.emailData.controls['email'].value).then(() => {
	loader.dismiss();
        this.navCtrl.pop();
    });
  }
}
