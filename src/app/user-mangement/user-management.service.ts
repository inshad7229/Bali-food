import { Injectable } from '@angular/core';
import { Http ,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import { environment } from '../../environments/environment.prod'


@Injectable()

export class UserManagementService  {
	
	constructor(private http:Http) {
		// code...
	}

	getUserData():  Observable<any> {
        let api =  environment.endPoint+"allUsers";
        return this.http.get(api)
        .map(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    statusChange(id): Observable<any>{
        let userId= id;
        let body
        let api = environment.endPoint+"accountActivationDeactivation/"+ userId;
        return this.http.put(api,body)
        .map(response =>{
            return response.json();
        }).catch(error=>{
            return error;
        })
    }

    deleteUser(id): Observable<any>{
        let userId= id;
        let api = environment.endPoint+"deleteUser/"+ userId;
        return this.http.delete(api)
        .map(response=>{
            return response.json();
        }).catch(error=>{
            return error;
        })
    }
}