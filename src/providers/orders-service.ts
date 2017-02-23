import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import {AppSettings} from '../appSettings';

@Injectable()
export class OrdersService {

  public orderStatus: boolean;
  
  constructor(public http: Http) {
    console.log('OrdersService Provider');
  }


    placeOrder(order: any) {
    
	    if (this.orderStatus) {
		return Promise.resolve(this.orderStatus);
	    }

	    return new Promise(resolve => {
		let headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });

		let body = JSON.stringify(order);

		console.log(body);

		this.http.post(AppSettings.API_ENDPOINT + 'orders/placeOrder' , body, options)
		    .map(res => res.json())
		    .subscribe(data => {
		      this.orderStatus = data;
		      resolve(this.orderStatus);
		    });
	    });
	}

}
