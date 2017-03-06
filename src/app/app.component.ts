import { Component, ViewChild} from '@angular/core';

import { Platform, AlertController, Nav} from 'ionic-angular';

import { StatusBar, Splashscreen, Push } from 'ionic-native';

import { CategoriesPage } from '../pages/categories/categories';
import { ProductPage } from '../pages/product/product';

import {EmailsService} from '../providers/emails-service';


@Component({
  templateUrl: 'app.html',
  providers: [EmailsService]
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage: any = CategoriesPage;

  constructor(public platform: Platform,
              public alertCtrl: AlertController,
	      public emailService: EmailsService) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
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
      this.emailService.addDeviceToken(data.registrationId);
    });
    push.on('notification', (data) => {
      console.log('message', data.message);
      let self = this;
      //if user using app and push notification comes
      if (data.additionalData.foreground) {
        // if application open, show popup
        let confirmAlert = this.alertCtrl.create({
          title: 'Нов продукт',
          message: data.message,
          buttons: [{
            text: 'Пропусни',
            role: 'cancel'
          }, {
            text: 'Виж',
            handler: () => {
              //TODO: Your logic here
              self.nav.push(ProductPage, {id: data.message});
            }
          }]
        });
        confirmAlert.present();
      } else {
        //if user NOT using app and push notification comes
        //TODO: Your logic on click of push notification directly
        self.nav.push(ProductPage, {id: data.message});
        console.log("Push notification clicked");
      }
    });
    push.on('error', (e) => {
      console.log(e.message);
    });
  }
}
