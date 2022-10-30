import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store'

import { Ingrediant } from '../shared/Ingrediant.Model';
import { ShoppingListService } from './shoping-list.service';
import { LoggingService } from './../shared/logging.service';

import * as fromAppReducer from '../Store/app.reducer';
import * as shoppingListActions from './store/shopping-list.actions'
import * as fromShoppingList from './store/shopping-list.reducers';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  private igObservable!: Subscription;
  ingrediants!: Observable<fromShoppingList.State>;
  filteredvalue = '';
  constructor(private slService: ShoppingListService,
              private _logService: LoggingService,
              private store: Store<fromAppReducer.appState>) { }


  ngOnInit(): void {
    this.ingrediants = this.store.select('shoppingList')
    // this.ingrediants = this.slService.getIngrediants();
    // this.igObservable = this.slService.IngrediantsChanged.subscribe(
    //   (ingrediants: Ingrediant[]) => {
    //     this.ingrediants = ingrediants;
    //   }
    // )

    this._logService.printLog("Log from Shopping-List ")
  }

  onEditItem(index: number){
    // this.slService.StartEditing.next(index);
    this.store.dispatch(new shoppingListActions.StartEdit(index));
  }

  ngOnDestroy(): void {
    // this.igObservable.unsubscribe();
  }
}
