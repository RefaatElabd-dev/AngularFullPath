import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Recipe } from '../recipe.Model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  recipesListSupscriper!: Subscription;

  constructor(private recipeServise: RecipeService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.recipesListSupscriper = this.recipeServise.recipesChanged.subscribe(recipes => {
      this.recipes = recipes;
    });
    this.recipes = this.recipeServise.getRecipes();
  }

  onNewRecipe(){
    this.router.navigate(["new"], {relativeTo: this.route})
  }

  ngOnDestroy(): void {
    this.recipesListSupscriper.unsubscribe();
  }
}
