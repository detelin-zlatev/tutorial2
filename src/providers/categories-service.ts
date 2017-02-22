import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import {AppSettings} from '../appSettings';

@Injectable()
export class CategoriesService {

  public categories: any;
  public category: any;
  public products: any;

  constructor(public http: Http) {
    console.log('CategoriesService Provider');
  }


  all() {
    if (this.categories) {
        return Promise.resolve(this.categories);
    }

    return new Promise(resolve => {
        let headers = new Headers({ 'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        this.http.get(AppSettings.API_ENDPOINT + 'categories/all', options)
            .map(res => res.json())
            .subscribe(data => {
	      this.categories = data;
              resolve(this.categories);
            });
    });
  }

    single(id: number, password: string) {
	    if (this.category) {
		return Promise.resolve(this.category);
	    }

	    return new Promise(resolve => {
		let headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });

		let body = JSON.stringify({
          		id: id,
			    password: password
        	});

        	console.log(body);

        	this.http.post(AppSettings.API_ENDPOINT + 'categories/single', body, options)
		    .map(res => res.json())
		    .subscribe(data => {
              		console.log(data);
              		this.category = data;
              		resolve(this.category);
            	});
	});
    }

    listProducts(category_id: number, page: number, size: number) {
    
	    if (this.products) {
		return Promise.resolve(this.products);
	    }

	    return new Promise(resolve => {
		let headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });

		let body = JSON.stringify({
		    category_id: category_id,
		    page: page,
		    size: size
		});

		console.log(body);

		this.http.post(AppSettings.API_ENDPOINT + 'products/listPaged' , body, options)
		    .map(res => res.json())
		    .subscribe(data => {
		      this.products = data;
		      resolve(this.products);
		    });
	    });
	}

}
