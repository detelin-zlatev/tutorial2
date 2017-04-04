import { Component } from '@angular/core';

import { NavController, NavParams, LoadingController } from 'ionic-angular';

import {CategoriesService} from '../../providers/categories-service';

import {ProductPage} from '../product/product'
import {CategoriesPage} from '../categories/categories'
import {BasketPage} from '../basket/basket';

import { Storage } from '@ionic/storage';

import {AppSettings} from '../../appSettings';

@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
  providers: [CategoriesService]
})
export class CategoryPage {

  public products: any;
  public imagesPath: string;
  public page: number;
  public size: number;
public basketSize: number;

  constructor(public storage: Storage, public categoriesService: CategoriesService, public navCtrl: NavController, public navParams: NavParams, public loadingController: LoadingController) {
    this.page = 1;
    this.size = 6;
    let loader = this.loadingController.create({
      content: "Зарежда..."
    });
    loader.present();

    this.imagesPath = AppSettings.API_ENDPOINT + 'img/upload/';
    this.storage.get('basket').then((basket) => {if (basket) {this.basketSize = basket.length; } else {this.basketSize = 0;}});  
    this.categoriesService.listProducts(this.navParams.get('categoryId'), this.page, this.size).then(data => {
          this.products = data.products;
	  loader.dismiss();
    });
  }


  goToProduct(product: any) {
  	this.navCtrl.push(ProductPage, {product: product});	
  }

  goToHome() {
  	this.navCtrl.push(CategoriesPage);	
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    this.page++;
    this.categoriesService.products = null;
    this.categoriesService.listProducts(this.navParams.get('categoryId'), this.page, this.size).then(data => {
	  if (data.products && data.products.length > 0) {
	  	this.products = this.products.concat(data.products);
	  	infiniteScroll.complete();
          } else {
		infiniteScroll.complete();
		infiniteScroll.enable(false);
	  }
	});
  }

    goToBasket() {
  	this.navCtrl.push(BasketPage, { "parentPage": this });	
  }
}
