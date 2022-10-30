import { Subject } from 'rxjs';

import { Ingrediant } from "../shared/Ingrediant.Model";

export class ShoppingListService{
    IngrediantsChanged = new Subject<Ingrediant[]>();
    StartEditing = new Subject<number>();
    
    private ingrediants:Ingrediant[] = [
            new Ingrediant("Apples", 5),
            new Ingrediant("Tomatoes", 3),
        ];

    public getIngrediant(index:number){
        return this.ingrediants[index];
    }

    public updateIngrediant(index: number, ingrediant: Ingrediant){
        this.ingrediants[index] = ingrediant;
        this.IngrediantsChanged.next(this.ingrediants.slice());
    }

    public getIngrediants(){
        return this .ingrediants.slice();
    }

    public AddIngrediant(ingrediant: Ingrediant){
        this.ingrediants.push(ingrediant);
        this.IngrediantsChanged.next(this.getIngrediants().slice());
    }
    
    public AddIngrediants(ingrediants: Ingrediant[]){
        this.ingrediants.push(...ingrediants);
        this.IngrediantsChanged.next(this.getIngrediants().slice());
    }

    public DeleteIngrediant(index: number){
        this.ingrediants.splice(index, 1);
        this.IngrediantsChanged.next(this.ingrediants.slice());
    }
}