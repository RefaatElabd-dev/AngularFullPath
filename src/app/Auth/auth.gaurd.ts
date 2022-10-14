import { Injectable  } from "@angular/core"
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from "@angular/router";
import { map, take, Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({providedIn: 'root'})
export class AuthGaurd implements CanActivate{
    constructor(private authService: AuthService, private router: Router){ }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : boolean 
    | UrlTree 
    | Observable<boolean | UrlTree> 
    | Promise<boolean | UrlTree> {
        return this.authService.userSubject.pipe(
            take(1),
            map((user) => {
                return (user)? true: this.router.createUrlTree(['/auth']);
            })
        )
    }

}