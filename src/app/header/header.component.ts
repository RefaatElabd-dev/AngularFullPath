import { Component, OnDestroy, OnInit } from "@angular/core";
import { DataStorageService } from './../shared/data-storage.service';
import { Subscription } from 'rxjs';
import { AuthService } from "../auth/auth.service";
@Component({
    selector:"app-header",
    templateUrl: "./header.component.html"
})

export class HeaderComponent implements OnInit, OnDestroy{
    collapsed = true;
    isAuthenticated = false;
    appStatus = new Promise((resolve, reject)=>{
        setTimeout(()=>resolve('stable'), 2000);
    })

    userObs!: Subscription;
    constructor(private dataStorageService: DataStorageService, private authService: AuthService){}
   
    ngOnInit(): void {
        this.userObs = this.authService.userSubject.subscribe(user => {
            this.isAuthenticated = !!user;
        });
    }
    
    
    
    onSaveData(){
        this.dataStorageService.setRecipes();
    }

    onFetchData(){
        this.dataStorageService.getRecipes().subscribe();
    } 

    onLogout(){
        this.authService.logout();
    }
    
    ngOnDestroy(): void {
        this.userObs.unsubscribe();
    }
}