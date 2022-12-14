import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, Observable, take, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipes/recipe.Model";
import { RecipeService } from './../recipes/recipe.service';
import { Ingrediant } from './Ingrediant.Model';

@Injectable({providedIn: 'root'})
export class DataStorageService {
   constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}

   setRecipes(){
    let recipes = this.recipeService.getRecipes();
    this.http.put('https://recipebook-f1bd6-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(
        (res) => console.log(res)
    )
   }

   getRecipes(): Observable<Recipe[]>{
        
            return this.http.get<Recipe[]>('https://recipebook-f1bd6-default-rtdb.firebaseio.com/recipes.json')
            .pipe(
                map(
                    (res) => res.map(
                        (recipe) => {
                            return {...recipe, ingrediants: recipe.ingrediants? recipe.ingrediants : []}
                        })
                ),
                tap((res) => {
                    this.recipeService.setRecipes(res)
                })
            )
   }
}