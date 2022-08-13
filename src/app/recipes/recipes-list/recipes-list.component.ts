import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.Model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(private recipeServise: RecipeService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.recipes = this.recipeServise.getRecipes();
  }

  onNewRecipe(){
    this.router.navigate(["new"], {relativeTo: this.route})
  }
}
