import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import {AppSettings} from '../appSettings';

@Injectable()
export class EmailsService {

  public status: boolean;
  public statusToken: boolean;
  
  constructor(public http: Http) {
    console.log('EmailsService Provider');
  }


  addEmail(email: string) {
    
		if (this.status) {
			return Promise.resolve(this.status);
		}

	  return new Promise(resolve => {
			let headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
			let options = new RequestOptions({ headers: headers });

			let body = JSON.stringify({email: email});

			console.log(body);

			this.http.post(AppSettings.API_ENDPOINT + 'emails/addEmail' , body, options)
					.map(res => res.json())
					.subscribe(data => {
						this.status = data;
						resolve(this.status);
					});
			});
	}



  addDeviceToken(token: string, ios: boolean) {
    
		if (this.statusToken) {
			return Promise.resolve(this.statusToken);
		}

	  return new Promise(resolve => {
			let headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
			let options = new RequestOptions({ headers: headers });

			let body = JSON.stringify({token: token, ios: ios});

			console.log(body);

			this.http.post(AppSettings.API_ENDPOINT + 'devices/addDeviceToken' , body, options)
					.map(res => res.json())
					.subscribe(data => {
						this.statusToken = data;
						resolve(this.statusToken);
					});
			});
	}
}
