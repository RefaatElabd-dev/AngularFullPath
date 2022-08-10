import { Ingrediant } from "../shared/Ingrediant.Model";
import { EventEmitter } from '@angular/core';

export class ShoppingListService{
    IngrediantsChanged = new EventEmitter<Ingrediant[]>();
    private ingrediants:Ingrediant[] = [
            new Ingrediant("Apples", 5),
            new Ingrediant("Tomatoes", 3),
        ];

    public getIngrediants(){
        return this .ingrediants.slice();
    }
    public AddIngrediant(ingrediant: Ingrediant){
        this.ingrediants.push(ingrediant);
        this.IngrediantsChanged.emit(this.getIngrediants());
    }
    
    public AddIngrediants(ingrediants: Ingrediant[]){
        this.ingrediants.push(...ingrediants);
        this.IngrediantsChanged.emit(this.getIngrediants());
    }
}