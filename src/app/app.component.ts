import { Component, ViewChild} from '@angular/core';

import { Platform, AlertController, Nav, PopoverController} from 'ionic-angular';

import { StatusBar, Splashscreen, Push, Badge} from 'ionic-native';

import { CategoriesPage } from '../pages/categories/categories';
import { CategoryPage } from '../pages/category/category';
import { PasswordPage } from '../pages/password/password';

import {EmailsService} from '../providers/emails-service';


@Component({
  templateUrl: 'app.html',
  providers: [EmailsService]
})
export class MyApp {


  @ViewChild(Nav) nav: Nav;
  rootPage: any = CategoriesPage;

  private ios: boolean = false;

  constructor(public platform: Platform,
              public alertCtrl: AlertController,
	      public popoverCtrl: PopoverController,
	      public emailService: EmailsService) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.ios = this.platform.is('ios');
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.initPushNotification();
    });
  }


  initPushNotification(){
    if (!this.platform.is('cordova')) {
      console.warn("Push notifications not initialized. Cordova is not available - Run in physical device");
      return;
    }

    let push = Push.init({
      android: {
        senderID: "869504917457",
	topics: ['newProduct']
      },
      ios: {
        alert: "true",
        badge: false,
        sound: "true"
      },
      windows: {}
    });

    push.on('registration', (data) => {
      console.log("device token ->", data.registrationId);
      if (this.ios) {
        this.emailService.addDeviceToken(data.registrationId, this.ios);
      }
    });
    push.on('notification', (data) => {
      console.log('message', data.message);
      Badge.clear();
      let self = this;
      //if user using app and push notification comes
      if (data.additionalData.foreground) {
        // if application open, show popup
        let json = JSON.parse(JSON.stringify(data.additionalData));
        let confirmAlert = this.alertCtrl.create({
          title: 'Нови продукти',
          message: data.title,
          buttons: [{
            text: 'Пропусни',
            role: 'cancel'
          }, {
            text: 'Виж',
            handler: () => {
	      
	      self.openCategory(json.idNumber);
            }
          }]
        });
        confirmAlert.present();
      } else {
        //if user NOT using app and push notification comes
        //TODO: Your logic on click of push notification directly
	      let json = JSON.parse(JSON.stringify(data.additionalData));
        self.openCategory(json.idNumber);
        console.log("Push notification clicked");
      }
    });
    push.on('error', (e) => {
      console.log(e.message);
    });
  }


  openCategory(category: string) {
    let categoryData = category.split("#");
    let categoryId = categoryData[0];
    let hasPassword = categoryData[1];

    if(!hasPassword) {
	console.log('Without password');
    	this.nav.push(CategoryPage, {
    	   categoryId: categoryId
    	});
    } else {
      console.log('With password');
      let passPopover = this.popoverCtrl.create(PasswordPage, {id: categoryId});
      passPopover.present();
    }
  }
}
