import { Component } from '@angular/core';

import { Storage } from '@ionic/storage';

import { NavController, NavParams, AlertController } from 'ionic-angular';

import {FormBuilder, FormGroup } from '@angular/forms';

import {OrdersService} from '../../providers/orders-service';

import {AppSettings} from '../../appSettings';

@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
  providers: [OrdersService]
})
export class ProductPage {

  public product: any;
  public imagesPath: string;
  public orderData: FormGroup;
  public order: boolean;
  public addProduct: boolean;
  public finishOrder: boolean;

  constructor(public storage: Storage, public formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public ordersService: OrdersService) {
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
	this.storage.get('basket').then((basket) => {
		if (basket == null) {
			basket = [[this.product.id, this.orderData.controls['orderText'].value, this.orderData.controls['orderName'].value, this.orderData.controls['orderPhone'].value]];	
		} else {
			basket.push([this.product.id, this.orderData.controls['orderText'].value, this.orderData.controls['orderName'].value, this.orderData.controls['orderPhone'].value]);			
		}
		
		console.log('basket: ' + basket);	
	
		if (this.finishOrder) {
			this.ordersService.placeOrder(basket)
			      .then(data => {
					this.storage.set('basket', null).then(() => {
						console.log('Basket cleared');	
						this.resetForm();	

						let alert = this.alertCtrl.create({
						      title: 'Изпратена поръчка',
						      subTitle: 'Вашата поръчка беше изпратена успешно!',
						      buttons: ['OK']
						    });
						    alert.present();	
					});
			      });
		} else {
			this.storage.set('basket', basket).then(() => {
				console.log('Basket updated');	
				this.resetForm(); 

			        let alert = this.alertCtrl.create({
				      title: 'Добавен продукт',
				      subTitle: 'Продукта беше успешно добавен!',
				      buttons: ['OK']
				    });
				    alert.present();		
			});
		}
	});	
  }


  resetForm() {
	this.orderData.setValue({
          orderText: '',
	  orderName: '',
	  orderPhone: '',
        });
	this.order = false;
      	this.addProduct = false;
      	this.finishOrder = false;
  }

}
