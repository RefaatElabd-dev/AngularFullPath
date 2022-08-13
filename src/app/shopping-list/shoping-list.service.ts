import { Subject } from 'rxjs';

import { Ingrediant } from "../shared/Ingrediant.Model";

export class ShoppingListService{
    IngrediantsChanged = new Subject<Ingrediant[]>();
    private ingrediants:Ingrediant[] = [
            new Ingrediant("Apples", 5),
            new Ingrediant("Tomatoes", 3),
        ];

    public getIngrediants(){
        return this .ingrediants.slice();
    }
    public AddIngrediant(ingrediant: Ingrediant){
        this.ingrediants.push(ingrediant);
        this.IngrediantsChanged.next(this.getIngrediants());
    }
    
    public AddIngrediants(ingrediants: Ingrediant[]){
        this.ingrediants.push(...ingrediants);
        this.IngrediantsChanged.next(this.getIngrediants());
    }
}