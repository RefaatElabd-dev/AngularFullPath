import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { RecipeService } from './../recipe.service';
import { Recipe } from './../recipe.Model';
import { NEVER } from 'rxjs';
import { Ingrediant } from './../../shared/Ingrediant.Model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id!:number;
  editMode:boolean = false;
  recipeForm!: FormGroup;

  constructor(private route:ActivatedRoute, 
              private router: Router,
              private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.route.params.subscribe( (params) => {
      this.id = +params["id"];
      this.editMode = params["id"] != null;
      this.formInit();
    })
  }

  onSubmit(){
    if(this.editMode){
      this.recipeService.updateRecipe(this.id, this.recipeForm.value)
    }else{
      this.recipeService.addRecipe(this.recipeForm.value)
    }
    this.onCancel();
  }

  onCancel(){
    this.router.navigate(["../"], { relativeTo: this.route })
  }

  formInit(){
    let name = '';
    let imagePath = '';
    let description = '';
    let recipeIngrediants: any = new FormArray([]);

    if(this.editMode){
      let recipe: Recipe = this.recipeService.getRecipeOf(this.id);
      name = recipe.name;
      imagePath = recipe.imagePath;
      description = recipe.description;
      if(recipe['ingrediants']){
        for(let ingrediant of recipe.ingrediants){
          recipeIngrediants.push(
            new FormGroup({
              'name': new FormControl(ingrediant.name, Validators.required),
              'amount': new FormControl(ingrediant.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
              }));
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
      'description': new FormControl(description, Validators.required),
      'ingrediants': recipeIngrediants
    });
  }

  onAddIngredian(){
    (<FormArray> this.recipeForm.get('ingrediants')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      })
    );
  }

  getIngrediantsControls() {
    return (this.recipeForm.get('ingrediants') as FormArray).controls;
  }

  onDeleteIngrediant(index: number){
    (<FormArray>this.recipeForm.get('ingrediants')).removeAt(index);
  }
}
