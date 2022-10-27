import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingrediant } from '../shared/Ingrediant.Model';
import { ShoppingListService } from './shoping-list.service';
import { LoggingService } from './../shared/logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  private igObservable!: Subscription;
  ingrediants:Ingrediant[] = [];
  filteredvalue = '';
  constructor(private slService: ShoppingListService, private _logService: LoggingService) { }


  ngOnInit(): void {
    this.ingrediants = this.slService.getIngrediants();
    this.igObservable = this.slService.IngrediantsChanged.subscribe(
      (ingrediants: Ingrediant[]) => {
        this.ingrediants = ingrediants;
      }
    )

    this._logService.printLog("Log from Shopping-List ")
  }

  onEditItem(index: number){
    this.slService.StartEditing.next(index);
  }

  ngOnDestroy(): void {
    this.igObservable.unsubscribe();
  }
}
