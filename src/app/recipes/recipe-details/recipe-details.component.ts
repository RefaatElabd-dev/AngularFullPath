import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RecipeService } from '../recipe.service';
import { Recipe } from './../recipe.Model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  recipe!: Recipe;
  id!: number;
  constructor(private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe( params =>{
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipeOf(this.id);
    })
  }

  addToShoppingList(){
    this.recipeService.addToShoppingList(this.recipe)
}

  onEditRecipe(){
    this.router.navigate(["edit"], { relativeTo: this.route })
  }
}
