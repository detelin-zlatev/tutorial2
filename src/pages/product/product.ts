import { Component } from '@angular/core';

import { Storage } from '@ionic/storage';

import { NavController, NavParams } from 'ionic-angular';

import {FormBuilder, FormGroup } from '@angular/forms';

import {AppSettings} from '../../appSettings';

@Component({
  selector: 'page-product',
  templateUrl: 'product.html'
})
export class ProductPage {

  public product: any;
  public imagesPath: string;
  public orderData: FormGroup;
  public order: boolean;
  public addProduct: boolean;
  public finishOrder: boolean;

  constructor(public storage: Storage, public formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
      this.imagesPath = AppSettings.API_ENDPOINT + 'img/upload/';
      this.product = this.navParams.get('product');
      this.orderData = this.formBuilder.group({
        orderText: [''],
        orderName: [''],
        orderPhone: ['']
      });
      this.order = false;
      this.addProduct = false;
      this.finishOrder = false;
  }

  doOrder() {
  	this.order = true;
  }

  doFinish() {
  	this.finishOrder = true;
  }

  completeOrder() {
	this.storage.get('basket').then((token) => {
		});
  }

}
