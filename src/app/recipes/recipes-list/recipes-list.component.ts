import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.Model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  recipes:Recipe[] = [
    new Recipe("Test Name", "Test Recipe Description","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGo9C2-wIEGp3KnCOF7D4P9P6C8x2Q5CSeGA&usqp=CAU"),
    new Recipe("Test Name", "Another Recipe Description","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGo9C2-wIEGp3KnCOF7D4P9P6C8x2Q5CSeGA&usqp=CAU"),
  ]
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe: Recipe){
    this.recipeWasSelected.emit(recipe);
  }

}
