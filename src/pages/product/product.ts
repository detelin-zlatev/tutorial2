import { Component } from '@angular/core';

import { Storage } from '@ionic/storage';

import { PhotoViewer } from 'ionic-native';

import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import {FormBuilder, FormGroup } from '@angular/forms';

import {OrdersService} from '../../providers/orders-service';

import {AppSettings} from '../../appSettings';

import {CategoriesPage} from '../categories/categories'

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

  constructor(public storage: Storage, public formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public ordersService: OrdersService, public loadingController: LoadingController) {
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

	zoom() {
		PhotoViewer.show(this.imagesPath + this.product.filepath);
	}

  doOrder() {
  	this.order = true;
  }

  doFinish() {
  	this.finishOrder = true;
  }

  goToCategories() {
	this.order = false;
        this.addProduct = false;
        this.finishOrder = false;
	this.navCtrl.push(CategoriesPage);
 }

  completeOrder() {
	this.storage.get('basket').then((basket) => {
		if (!this.finishOrder) {		
			if (basket == null) {
				basket = [[this.product.id, this.orderData.controls['orderText'].value, this.orderData.controls['orderName'].value, this.orderData.controls['orderPhone'].value]];	
			} else {
				basket.push([this.product.id, this.orderData.controls['orderText'].value, this.orderData.controls['orderName'].value, this.orderData.controls['orderPhone'].value]);			
			}
			this.addProduct = true;	
		}
		
		console.log('basket: ' + basket);	
	
		if (this.finishOrder) {
			let loader = this.loadingController.create({
	      content: "Моля изчакайте..."
	    });
			loader.present();
			this.ordersService.placeOrder(basket)
			      .then(data => {
					this.storage.set('basket', null).then(() => {
						console.log('Basket cleared');	
						this.resetForm();	
						loader.dismiss();
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
				//this.resetForm(); 

			        let alert = this.alertCtrl.create({
				      title: 'Добавен продукт',
				      subTitle: 'Продукта беше успешно добавен във Вашата поръчка!',
				      buttons: ['OK']
				    });
				    alert.present();	
				console.log('this.addProduct22: ' + this.addProduct);	
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
