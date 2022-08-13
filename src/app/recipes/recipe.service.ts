import { Injectable } from "@angular/core";
import { Ingrediant } from "../shared/Ingrediant.Model";
import { Recipe } from "./recipe.Model";
import { ShoppingListService } from './../shopping-list/shoping-list.service';

@Injectable()
export class RecipeService{
    private recipes:Recipe[] = [
        new Recipe("Big Fat Burger", "Burger With Tomato","data:image/jpeg;base64,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", 
        [
            new Ingrediant("Tomato", 2),
            new Ingrediant("Burger", 2)
        ]),
        new Recipe("Pasta", "Delicius Creamed Macrona","data:image/jpeg;base64,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", 
        [
            new Ingrediant("Creama", 1),
            new Ingrediant("spaggti", 7)
        ]),
      ];

      constructor(private slService:ShoppingListService){

      }

    public getRecipes(){
        return this.recipes.slice();
    }

    getRecipeOf(index: number): Recipe {
        return this.recipes[index];
      }

    addToShoppingList(recipe: Recipe) {
        this.slService.AddIngrediants(recipe.ingrediants);
      }
}