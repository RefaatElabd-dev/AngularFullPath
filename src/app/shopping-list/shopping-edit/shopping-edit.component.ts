import { Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import { Ingrediant } from './../../shared/Ingrediant.Model';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') ingName: ElementRef | undefined;
  @ViewChild('amountInput') ingAmount: ElementRef | undefined;
  @Output() ingrediantAdded = new EventEmitter<Ingrediant>();

  constructor() { }

  ngOnInit(): void {
  }
  
  onAdd(){
    const name = this.ingName?.nativeElement.value;
    const amount = this.ingAmount?.nativeElement.value;
    const ingrediant = new Ingrediant(name, amount)
    this.ingrediantAdded.emit(ingrediant);
    console.log(ingrediant)
  }
}
