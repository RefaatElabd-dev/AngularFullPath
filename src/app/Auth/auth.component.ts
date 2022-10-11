import { Component, OnInit } from "@angular/core";
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit{
    isLogin: Boolean = true;
    constructor(){

    }

    ngOnInit(): void {
    }
    
    onLoginSwitch(){
        this.isLogin = !this.isLogin;
    }

    onSubmit(form: NgForm){
        console.log(form.value)
    }
}