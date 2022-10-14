import { Component, OnInit } from "@angular/core";
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit{
    isLogin: Boolean = true;
    isLoading: boolean = false;
    error: string = '';

    AuthObs!: Observable<AuthResponseData>;
    constructor(private authService: AuthService, private router: Router){

    }

    ngOnInit(): void {
    }
    
    onLoginSwitch(){
        this.isLogin = !this.isLogin;
    }

    onSubmit(form: NgForm){
        if(!form.valid) return;
        this.isLoading = true;
        const email = form.value.email;
        const password = form.value.password;
        if(this.isLogin){
            this.AuthObs = this.authService.login(email, password);
        }
        else{
            this.AuthObs = this.authService.signup(email, password);
        }

        this.AuthObs.subscribe(
            res => {
                console.log(res);
                this.isLoading = false;
                this.router.navigate(['/recipes']);
            },
            errMessage => {
                this.error = errMessage;
                this.isLoading = false;
            })

        form.reset();
    }
}