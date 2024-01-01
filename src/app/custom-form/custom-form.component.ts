import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'custom-form',
    templateUrl: './custom-form.component.html',
  })
  export class CustomFormComponent implements OnInit {

    phone: string = '011519588'
    ngOnInit(): void {
        
    }
    
  }