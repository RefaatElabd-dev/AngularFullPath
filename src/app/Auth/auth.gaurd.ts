import { Injectable  } from "@angular/core"
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from "@angular/router";
import { map, take, Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { Store } from '@ngrx/store';
import * as fromApp from './../Store/app.reducer';

@Injectable({providedIn: 'root'})
export class AuthGaurd implements CanActivate{
    constructor(private authService: AuthService, private router: Router, private store: Store<fromApp.appState>){ }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : boolean 
    | UrlTree 
    | Observable<boolean | UrlTree> 
    | Promise<boolean | UrlTree> {
        return this.store.select('auth').pipe(
            take(1),
            map((authState) => authState.user),
            map((user) => {
                return (user)? true: this.router.createUrlTree(['/auth']);
            })
        )
    }

}