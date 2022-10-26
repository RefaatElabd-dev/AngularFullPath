import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from "@angular/router";
import { AlertComponent } from './../shared/alert/alert.component';
import { PlaceholderDirective } from './../shared/placeholder/placeholder.directive';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {
    @ViewChild(PlaceholderDirective) HostRef!: PlaceholderDirective;

    isLogin: Boolean = true;
    isLoading: boolean = false;
    error: string = '';

    closeSup!: Subscription;

    AuthObs!: Observable<AuthResponseData>;
    constructor(private authService: AuthService, 
                private router: Router,
                private componentFactoryResolver: ComponentFactoryResolver){

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
                this.isLoading = false;
                this.router.navigate(['/recipes']);
            },
            errMessage => {
                this.error = errMessage;
                this.showErrorCmp(errMessage);
                this.isLoading = false;
            })

        form.reset();
    }

    private showErrorCmp(message: string){
        const alertCMPFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.HostRef.viewContainerRef;
        hostViewContainerRef.clear();

        const alertCMPRef = hostViewContainerRef.createComponent(alertCMPFactory);

        alertCMPRef.instance.message = message;
        this.closeSup = alertCMPRef.instance.close.subscribe(() => {
            this.closeSup.unsubscribe();
            hostViewContainerRef.clear();
        })
    }

    // onHandleError(){
    //     this.error = '';
    // }

    ngOnDestroy(): void {
        if(this.closeSup)
         this.closeSup.unsubscribe();
    }
}