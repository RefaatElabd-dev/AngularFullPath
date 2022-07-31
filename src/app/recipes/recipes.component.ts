import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.Model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  selectedRecipe:Recipe;
  constructor() { 
    this.selectedRecipe = new Recipe("","","");
  }

  ngOnInit(): void {
  }

}
