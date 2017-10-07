import { Injectable } from '@angular/core';
import { Http ,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';


@Injectable()

export class DashboardService  {
	
	constructor(private http:Http) {
		// code...
	}

	getImage(loginModel:any):  Observable<any> {
        let api =  "http://localhost:8080/api/image/59b64d9a286f8e0f70b017c2";
        return this.http.get(api)
        .map(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }
}