import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../recipe.Model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  constructor() { this.recipe = new Recipe('','','');}
  @Input() recipe:Recipe;

  @Output() selectRecipe = new EventEmitter<void>();

  ngOnInit(): void {
  }

  onSelect(){
    this.selectRecipe.emit();
  }
}
