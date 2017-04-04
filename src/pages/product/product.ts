import { Component } from '@angular/core';

import { Storage } from '@ionic/storage';

import { PhotoViewer } from 'ionic-native';

import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import {FormBuilder, FormGroup } from '@angular/forms';

import {OrdersService} from '../../providers/orders-service';

import {AppSettings} from '../../appSettings';

import {CategoriesPage} from '../categories/categories'
import {BasketPage} from '../basket/basket';

@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
  providers: [OrdersService]
})
export class ProductPage {

  public product: any;
  public imagesPath: string;
  public orderData: FormGroup;
	//public orderDataDetails: FormGroup;
  public order: boolean;
  public addProduct: boolean;
  public finishOrder: boolean;
  public basketSize: number;

  constructor(public storage: Storage, public formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public ordersService: OrdersService, public loadingController: LoadingController) {
      this.imagesPath = AppSettings.API_ENDPOINT + 'img/upload/';
      this.product = this.navParams.get('product');
      this.storage.get('basket').then((basket) => {if (basket) {this.basketSize = basket.length; } else {this.basketSize = 0;}});  
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
	this.goToBasket();
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
				basket = [[this.product, this.orderData.controls['orderText'].value, '', '']];	
			} else {
				basket.push([this.product, this.orderData.controls['orderText'].value, '', '']);			
			}
			this.addProduct = true;	
			this.basketSize++;
		}
		
		
		if (this.finishOrder) {
			
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

      goToBasket() {
  	this.navCtrl.push(BasketPage);	
  }

    goBack() {
  	this.navCtrl.pop();	
  }

}
