import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingrediant } from '../shared/Ingrediant.Model';
import { ShoppingListService } from './shoping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  private igObservable!: Subscription;
  ingrediants:Ingrediant[] = [];
  filteredvalue = '';
  constructor(private slService: ShoppingListService) { }


  ngOnInit(): void {
    this.ingrediants = this.slService.getIngrediants();
    this.igObservable = this.slService.IngrediantsChanged.subscribe(
      (ingrediants: Ingrediant[]) => {
        this.ingrediants = ingrediants;
      }
    )
  }

  onEditItem(index: number){
    this.slService.StartEditing.next(index);
  }

  ngOnDestroy(): void {
    this.igObservable.unsubscribe();
  }
}
