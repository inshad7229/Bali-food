import { Injectable } from '@angular/core';
import { Http ,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';
import {environment} from '../../environments/environment.prod';
@Injectable()
export class GeneralmanagementService {

  constructor(private http:Http) { }

  	getFaq():  Observable<any> {
        let api =  environment.endPoint+"get_faq";
        return this.http.get(api)
        .map(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    addFaq(faqData): Observable <any>{
        let body = faqData;
        let api =  environment.endPoint+"addFaq";
        return this.http.post(api,body)
        .map(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    deleteFaq(id):Observable<any> {
        let api =  environment.endPoint+"deleteFaq/"+id;
        return this.http.delete(api)
        .map(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    editFaq(faqData): Observable <any>{
        let body = faqData;
        let api =  environment.endPoint+"editFaq";
        return this.http.post(api,body)
        .map(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    getContactUsData():  Observable<any> {
        let api =  environment.endPoint+"get_contactUs";
        return this.http.get(api)
        .map(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }
}
