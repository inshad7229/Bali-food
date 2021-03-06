import { Injectable } from '@angular/core';
import { Http ,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';
import {environment} from '../../environments/environment.prod';



@Injectable()

export class LoginService  {
	
	constructor(private http:Http) {
		// code...
	}

	Login(loginModel:any):  Observable<any> {
		let body = loginModel;
        let api =  environment.endPoint+"adminLogin";
        return this.http.post(api,body)
        .map(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    forgotPassword(loginModel:any):  Observable<any> {
        let body = loginModel;
        let api =  environment.endPoint+"adminForgotPassword";
        return this.http.post(api,body)
        .map(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    // registeration(registrationModel:any): Observable <any>{
    //     let body = registrationModel;
    //     let api ="http://localhost:8080/api/signup";
    //     return this.http.post(api,body)
    //     .map(response =>{
    //         return response.json();
    //     }).catch(error => {
    //         return error;
    //     })
    // }
}