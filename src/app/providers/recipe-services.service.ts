import { Injectable } from '@angular/core';
import { Http ,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';
import {environment} from '../../environments/environment.prod';
@Injectable()
export class RecipeServicesService {

  constructor(private http:Http) { }

  	getCategories():  Observable<any> {
        let api =  environment.endPoint+"get_categories";
        return this.http.get(api)
        .map(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    addCategory(categoryData):Observable<any>{
    	let api =  environment.endPoint+"add_categories";
    	let body= categoryData
    	return this.http.post(api,body).map(response=>{
    		return response.json();
    	}).catch(error=>{
    		return error;
    	})
    }

    deleteRecipes(recipeIds):Observable<any>{
        console.log(recipeIds);
        let api  =environment.endPoint+"deleteCategories";
        let body = {
            ids:recipeIds
        }
        return this.http.post(api,body).map(resposne=>{
            return resposne.json();
        }).catch(error=>{
            return error
        })
    }

    getAllRecipes():Observable<any>{
        let api =environment.endPoint+"allRecipes";
        return this.http.get(api)
        .map(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    addRecipe(recipeData):Observable<any>{
        let api  =environment.endPoint+"addRecipesAdmin";
        let body = recipeData
        return this.http.post(api,body).map(resposne=>{
            return resposne.json();
        }).catch(error=>{
            return error
        })
    }
}
