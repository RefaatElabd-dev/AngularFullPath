import { Component, OnDestroy, OnInit } from "@angular/core";
import { DataStorageService } from './../shared/data-storage.service';
import { Subscription, map } from 'rxjs';
import { AuthService } from "../auth/auth.service";
import { Store } from "@ngrx/store";
import * as fromApp from './../Store/app.reducer';

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
    constructor(private dataStorageService: DataStorageService, private authService: AuthService, private store: Store<fromApp.appState>){}
   
    ngOnInit(): void {
        this.userObs = this.store
          .select("auth")
          .pipe(map((authState) => authState.user))
          .subscribe((user) => {
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