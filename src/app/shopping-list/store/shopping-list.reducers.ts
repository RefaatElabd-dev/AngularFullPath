import * as ShoppingListActions from "./shopping-list.actions";
import { Ingrediant } from "../../shared/Ingrediant.Model";

export interface State{
    ingrediants: Ingrediant[];
    editedIngrediant: Ingrediant;
    editedIngrediantIndex: number;
}

const intialState: State = {
    ingrediants: [
        new Ingrediant("Apples", 5),
        new Ingrediant("Tomatoes", 3),
    ],
    editedIngrediant: new Ingrediant('', 0),
    editedIngrediantIndex: -1
};

export function shoppingListReducer( 
    state = intialState, 
    action: ShoppingListActions.SelectedAction
): State{
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIANT:
            return {
                ...state, 
                ingrediants: [ ...state.ingrediants, action.payload]
            };
        case ShoppingListActions.ADD_INGREDIANTS:
            return {
                ...state, 
                ingrediants: [ ...state.ingrediants, ...action.payload]
            };
        case ShoppingListActions.UPDATE_INGREDIANT:
            const updatedIngrediants = [ ...state.ingrediants ]
            updatedIngrediants[state.editedIngrediantIndex] = action.payload;
            return {
                ...state, 
                ingrediants: updatedIngrediants,
                editedIngrediant: new Ingrediant('', 0),
                editedIngrediantIndex: -1
            };
        case ShoppingListActions.DELETE_INGREDIANT:
            return {
                ...state, 
                ingrediants: state.ingrediants.filter((ig, igIndex) =>
                                igIndex !== state.editedIngrediantIndex),
                editedIngrediant: new Ingrediant('', 0),
                editedIngrediantIndex: -1
            };
        case ShoppingListActions.START_EDIT:
            return {
                ...state,
                editedIngrediant: { ...state.ingrediants[action.payload]},
                editedIngrediantIndex: action.payload
            }
        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngrediant: new Ingrediant('', 0),
                editedIngrediantIndex: -1
            }
        default: return state;
    }
}