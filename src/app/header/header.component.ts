import { Component } from "@angular/core";
@Component({
    selector:"app-header",
    templateUrl: "./header.component.html"
})

export class HeaderComponent{
    collapsed = true;
    appStatus = new Promise((resolve, reject)=>{
        setTimeout(()=>resolve('stable'), 2000);
    })
}