import { Component, OnInit } from "@angular/core";
import { CheckTypeEnum } from "ngx-custom-comps";

@Component({
    selector: 'custom-form',
    templateUrl: './custom-form.component.html',
  })
  export class CustomFormComponent implements OnInit {

    phone: string = '011519588';
    isChecked: boolean = false;
    magicCheckType: CheckTypeEnum = CheckTypeEnum.Magic
    toggleCheckType: CheckTypeEnum = CheckTypeEnum.Toggle
    ngOnInit(): void {
        
    }
    
  }