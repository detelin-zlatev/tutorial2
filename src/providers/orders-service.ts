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

		let processedOrder = [[]];

		for (let i = 0; i < order.length; i++) {
			processedOrder.push([order[i][0].id, order[i][1], order[i][2], order[i][3]]);		
		}

		let body = JSON.stringify(processedOrder);

		console.log(body);

		this.http.post(AppSettings.API_ENDPOINT + 'orders/placeOrder' , body, options)
		    .map(res => res.json())
		    .subscribe(data => {
		      this.orderStatus = data;
			this.orderStatus = true;
		      resolve(this.orderStatus);
		    });
	    });
	}

}
