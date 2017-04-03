import { Component } from '@angular/core';

import { Storage } from '@ionic/storage';

import { PhotoViewer } from 'ionic-native';

import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import {FormBuilder, FormGroup } from '@angular/forms';

import {OrdersService} from '../../providers/orders-service';

import {AppSettings} from '../../appSettings';

import {CategoriesPage} from '../categories/categories'

@Component({
  selector: 'page-basket',
  templateUrl: 'basket.html',
  providers: [OrdersService]
})
export class BasketPage {

  public product: any;
  public imagesPath: string;
  public orderData: FormGroup;
	//public orderDataDetails: FormGroup;
  public order: boolean;
  public addProduct: boolean;
  public finishOrder: boolean;

  constructor(public storage: Storage, public formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public ordersService: OrdersService, public loadingController: LoadingController) {
      this.imagesPath = AppSettings.API_ENDPOINT + 'img/upload/';
      this.product = this.navParams.get('product');
      this.orderData = this.formBuilder.group({
        orderText: ['']
      });
			//this.orderDataDetails = this.formBuilder.group({
      //  orderName: [''],
      //  orderPhone: ['']
      //});
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
				basket = [[this.product.id, this.orderData.controls['orderText'].value, '', '']];	
			} else {
				basket.push([this.product.id, this.orderData.controls['orderText'].value, '', '']);			
			}
			this.addProduct = true;	
		}
		
		
		if (this.finishOrder) {
			let loader = this.loadingController.create({
	      content: "Моля изчакайте..."
	    });
			loader.present();
			basket[basket.length - 1][2] = 'phone';
			basket[basket.length - 1][3] = 'phone';
			this.ordersService.placeOrder(basket)
			      .then(data => {
					this.storage.set('basket', null).then(() => {
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
				      let alert = this.alertCtrl.create({
				      title: 'Добавен продукт',
				      subTitle: 'Продукта беше успешно добавен във Вашата поръчка!',
				      buttons: ['OK']
				    });
				    alert.present();	
			});
		}
	});	
  }


  resetForm() {
	this.orderData.setValue({
          orderText: ''
        });
				//this.orderDataDetails.setValue({
   	//orderName: '',
	//  orderPhone: '',
        //});
	this.order = false;
      	this.addProduct = false;
      	this.finishOrder = false;
  }

}
