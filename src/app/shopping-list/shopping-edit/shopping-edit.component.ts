import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingrediant } from './../../shared/Ingrediant.Model';
import { ShoppingListService } from './../shoping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm!: NgForm;
  editMode: boolean = false;
  currentIndex!: number;
  editedIngrediant!:Ingrediant;
  subscription!: Subscription;

  constructor(private slService: ShoppingListService) { }
  
  ngOnInit(): void {
    this.subscription = this.slService.StartEditing.subscribe((index:number) => {
      this.currentIndex = index;
      this.editMode = true;
      this.editedIngrediant = this.slService.getIngrediant(index);
      this.slForm.setValue({
        name: this.editedIngrediant.name,
        amount: this.editedIngrediant.amount
      })
    })
  }
  
  onSubmit(form: NgForm){
    const value = form.value;
    const ingrediant = new Ingrediant(value.name, value.amount)
    if(this.editMode)
    {
      this.slService.updateIngrediant(this.currentIndex, ingrediant);
    }
    else
    {
      this.slService.AddIngrediant(ingrediant);
    }
    
    this.editMode = false;
    form.reset();
  }

  onDelete(){
    this.slService.DeleteIngrediant(this.currentIndex);
    this.onClear();
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
