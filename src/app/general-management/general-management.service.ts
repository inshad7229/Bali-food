import { Injectable } from '@angular/core';
import { Http ,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import { environment } from '../../environments/environment.prod'

@Injectable()

export class GeneralManagentService  {
	
	constructor(private http:Http) {
		// code...
	}

	getAboutUsData():  Observable<any> {
        let api =  environment.endPoint+"aboutUs";
        return this.http.get(api)
        .map(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    updateAboutUsData(content):Observable<any>{
    	let id ="59c9eb1f74ee300b79e717b9"
    	let api= environment.endPoint+"aboutUs/"+id;
    	let body=content;
    	console.log(body);
    	return this.http.put(api,body)
    	.map(response => {
    		return response.json();
    	}).catch(error => {
    		return error;
    	})
    }
}