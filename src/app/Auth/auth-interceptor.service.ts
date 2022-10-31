import { HttpEvent, 
         HttpHandler, 
         HttpInterceptor, 
         HttpParams, 
         HttpRequest 
} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { exhaustMap, Observable, take } from 'rxjs';
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';

import * as fromApp from '../Store/app.reducer'
import { map } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthService, private store: Store<fromApp.appState>){ }
    intercept(req: HttpRequest<any>, next: HttpHandler)
        : Observable<HttpEvent<any>> 
        {
            return this.store.select('auth').pipe(
                take(1),
                map(authState => authState.user),
                exhaustMap(user => {
                    if(user){
                        const modifiedRequest = req.clone({
                        params: new HttpParams().set('auth', user?.token!)
                        });
                        return next.handle(modifiedRequest);
                    }

                    return next.handle(req);
                }))
        }
}