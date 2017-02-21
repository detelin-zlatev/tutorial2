import { Component, ViewChild } from '@angular/core';

import { Platform} from 'ionic-angular';

import { StatusBar, Splashscreen } from 'ionic-native';

import { CategoriesPage } from '../pages/categories/categories';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any = CategoriesPage;

  constructor(public platform: Platform) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
