import { Component } from '@angular/core';

import { Storage } from '@ionic/storage';

import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import {FormBuilder, FormGroup } from '@angular/forms';

import {OrdersService} from '../../providers/orders-service';

import {AppSettings} from '../../appSettings';

import {ProductPage} from '../product/product'
import {CategoriesPage} from '../categories/categories'

@Component({
  selector: 'page-basket',
  templateUrl: 'basket.html',
  providers: [OrdersService]
})
export class BasketPage {

  public imagesPath: string;
  public basket: any;
  
  constructor(public storage: Storage, public formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public ordersService: OrdersService, public loadingController: LoadingController) {
      this.imagesPath = AppSettings.API_ENDPOINT + 'img/upload/';
	this.storage.get('basket').then((basket) => {this.basket = basket; console.log(this.basket);});  
}

  completeOrder() {
	let loader = this.loadingController.create({
	      content: "Моля изчакайте..."
	});
	loader.present();
	this.storage.get('phone').then((phone) => {
		this.basket[this.basket.length - 1][2] = phone;
		this.basket[this.basket.length - 1][3] = phone;
		this.ordersService.placeOrder(this.basket).then(data => {
			this.storage.set('basket', null).then(() => {
				loader.dismiss();
				let alert = this.alertCtrl.create({
				      title: 'Изпратена поръчка',
				      subTitle: 'Вашата поръчка беше изпратена успешно!',
				      buttons: ['OK']
				    });
				    alert.present();	
				this.navCtrl.push(CategoriesPage);
			});
		});
	});
  }

  goToProduct(product: any) {
  	this.navCtrl.push(ProductPage, {product: product});	
  }

  deleteFromBasket(index: number) {
	this.basket.splice(index, 1);
	this.storage.set('basket', this.basket);	  
  }

}
