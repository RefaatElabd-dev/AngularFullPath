import { Injectable } from "@angular/core"
import { Recipe } from "./recipe.Model"
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router"
import { Observable } from "rxjs"
import { DataStorageService } from './../shared/data-storage.service';
import { RecipeService } from './recipe.service';

@Injectable({providedIn: 'root'})
export class RecipeResolverService implements Resolve<Recipe[]>
{
    constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        let recipes = this.recipeService.getRecipes();
        if(recipes.length === 0){
            return this.dataStorageService.getRecipes();
        }
        else{
            return recipes;
        }
    }
    
}