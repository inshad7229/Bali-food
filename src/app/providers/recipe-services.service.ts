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

    editCategory(categoryData):Observable<any>{
        let api =  environment.endPoint+"edit_Category";
        let body= categoryData
        return this.http.post(api,body).map(response=>{
            return response.json();
        }).catch(error=>{
            return error;
        })
    }

    deleteCategories(categoryIds):Observable<any>{
        console.log(categoryIds);
        let api  =environment.endPoint+"deleteCategories";
        let body = {
            ids:categoryIds
        }
        return this.http.post(api,body).map(resposne=>{
            return resposne.json();
        }).catch(error=>{
            return error
        })
    }

    deleteCategoryById(categoryId):Observable<any>{
        let api  =environment.endPoint+"deleteCategories/"+categoryId;
        return this.http.delete(api).map(resposne=>{
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

    addRecipeVideo(recipeId,media):Observable<any>{
        let api  = environment.endPoint+"recipeVideo/"+recipeId;
        let body = media
        return this.http.post(api,body).map(resposne=>{
            return resposne.json();
        }).catch(error=>{
            return error
        })
    }

    deleteRecipes(recipeIds):Observable<any>{
        console.log(recipeIds);
        let api  =environment.endPoint+"deleteRecipes";
        let body = {
            ids:recipeIds
        }
        return this.http.post(api,body).map(resposne=>{
            return resposne.json();
        }).catch(error=>{
            return error
        })
    }

    deleteComment(commentId,recipeId):Observable<any>{
         let api  = environment.endPoint+"deleteComment";
        let body = {
            recipe_id:recipeId,
            commentId:commentId
        }
        return this.http.post(api,body).map(resposne=>{
            return resposne.json();
        }).catch(error=>{
            return error
        })
    }

    getRecipe(id):Observable<any>{
        let api  =environment.endPoint+"getRecipe/"+id;
        return this.http.get(api).map(resposne=>{
            return resposne.json();
        }).catch(error=>{
            return error
        })
    }

    editRecipe(recipeData,id):Observable<any>{
        delete(recipeData.comments)
        delete(recipeData.likes)
        delete(recipeData.views)
        delete(recipeData.__v)
        delete(recipeData._id)
        console.log(recipeData)
        let api  =environment.endPoint+"editRecipe/"+id;
        let body = recipeData
        return this.http.post(api,body).map(resposne=>{
            return resposne.json();
        }).catch(error=>{
            return error
        })
    }
}
