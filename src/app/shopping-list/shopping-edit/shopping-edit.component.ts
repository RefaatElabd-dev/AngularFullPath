import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Ingrediant } from './../../shared/Ingrediant.Model';
import { ShoppingListService } from './../shoping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') ingName: ElementRef | undefined;
  @ViewChild('amountInput') ingAmount: ElementRef | undefined;

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
  }
  
  onAdd(){
    const name = this.ingName?.nativeElement.value;
    const amount = this.ingAmount?.nativeElement.value;
    const ingrediant = new Ingrediant(name, amount)
    this.slService.AddIngrediant(ingrediant);
  }
}
