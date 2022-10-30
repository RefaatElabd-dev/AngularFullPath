import * as fromShoppingList from '../shopping-list/store/shopping-list.reducers';
import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from './../auth/store/auth.reducer';

export interface appState { 
    shoppingList: fromShoppingList.State,
    auth: fromAuth.State
}

export const appReducer: ActionReducerMap<appState, any> = {
    shoppingList: fromShoppingList.shoppingListReducer,
    auth: fromAuth.authReducer
};