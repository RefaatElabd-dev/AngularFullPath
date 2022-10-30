import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingrediant } from './../../shared/Ingrediant.Model';
import { ShoppingListService } from './../shoping-list.service';
import { Store } from '@ngrx/store';
import * as shoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../../shared/types/ShppingListState';
import * as fromappReducer from '../../Store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html'
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm!: NgForm;
  editMode: boolean = false;
  currentIndex!: number;
  editedIngrediant!:Ingrediant;
  subscription!: Subscription;

  constructor(private slService: ShoppingListService,
              private store: Store<fromappReducer.appState>) { }
  
  ngOnInit(): void {
    this.subscription = this.store.select('shoppingList').subscribe(shoppingListState => {
      if(shoppingListState.editedIngrediantIndex > -1){
        this.currentIndex = shoppingListState.editedIngrediantIndex;
        this.editMode = true;
        this.editedIngrediant = shoppingListState.editedIngrediant
        this.slForm.setValue({
          name: this.editedIngrediant.name,
          amount: this.editedIngrediant.amount
        })
      }
      else {
        this.editMode = false;
      }
    })
    // this.subscription = this.slService.StartEditing.subscribe((index:number) => {
    //   this.currentIndex = index;
    //   this.editMode = true;
    //   this.editedIngrediant = this.slService.getIngrediant(index);
    //   this.slForm.setValue({
    //     name: this.editedIngrediant.name,
    //     amount: this.editedIngrediant.amount
    //   })
    // })
  }
  
  onSubmit(form: NgForm){
    const value = form.value;
    const ingrediant = new Ingrediant(value.name, value.amount)
    if(this.editMode)
    {
      // this.slService.updateIngrediant(this.currentIndex, ingrediant);
      this.store.dispatch(new shoppingListActions.UpdateIngridant(ingrediant));
    }
    else
    {
      this.store.dispatch(new shoppingListActions.AddIngridant(ingrediant));
      // this.slService.AddIngrediant(ingrediant);
    }
    
    this.editMode = false;
    form.reset();
  }

  onDelete(){
    // this.slService.DeleteIngrediant(this.currentIndex);
    this.store.dispatch(new shoppingListActions.DeleteIngridant())
    this.onClear();
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new shoppingListActions.StopEdit());
  }

  ngOnDestroy(): void {
    this.store.dispatch(new shoppingListActions.StopEdit());
    this.subscription.unsubscribe();
  }
}
