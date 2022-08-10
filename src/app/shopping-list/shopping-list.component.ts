import { Component, OnInit } from '@angular/core';
import { Ingrediant } from '../shared/Ingrediant.Model';
import { ShoppingListService } from './shoping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingrediants:Ingrediant[] = [];
  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingrediants = this.slService.getIngrediants();
    this.slService.IngrediantsChanged.subscribe(
      (ingrediants: Ingrediant[]) => {
        this.ingrediants = ingrediants;
      }
    )
  }

}
