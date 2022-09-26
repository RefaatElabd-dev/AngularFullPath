import { Component } from "@angular/core";
import { DataStorageService } from './../shared/data-storage.service';
@Component({
    selector:"app-header",
    templateUrl: "./header.component.html"
})

export class HeaderComponent{
    collapsed = true;
    appStatus = new Promise((resolve, reject)=>{
        setTimeout(()=>resolve('stable'), 2000);
    })
    constructor(private dataStorageService: DataStorageService){}
    onSaveData(){
        this.dataStorageService.setRecipes();
    }

    onFetchData(){
        this.dataStorageService.getRecipes().subscribe();
    }
}