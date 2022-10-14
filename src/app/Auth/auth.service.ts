import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap, throwError, BehaviorSubject } from "rxjs";
import { UserData } from "./UserData";
import { Router } from '@angular/router';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: "root" })
export class AuthService {
  private API_KEY = "AIzaSyBNgsV2oPFCIglHAFklbpnctoU-E5dkHRc";
  userSubject = new BehaviorSubject<UserData | null>(null);
  private tokenExpirationTimer: any;
  private tokenKey = 'userData';
  constructor(private _http: HttpClient, private router:Router) {}

  signup(email: string, password: string) {
    return this._http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) =>
          this.HandleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          )
        )
      );
  }

  login(email: string, password: string) {
    return this._http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) =>
          this.HandleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          )
        )
      );
  }

  logout(){
    this.userSubject.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem(this.tokenKey);
    clearTimeout(this.tokenExpirationTimer);
  }

  autoLogin(){
    const userData: {
      email: string,
      id: string,
      _token: string,
      _expirationDate:string
    } = JSON.parse(localStorage.getItem(this.tokenKey)!);

    if(!userData){
      return;
    }

    let loadedUser = new UserData(userData.email, userData.id, userData._token, new Date(userData._expirationDate));
    if(loadedUser.token){
      this.userSubject.next(loadedUser);
      let tokenExpirationIn = new Date(userData._expirationDate).getTime() - new Date().getTime();
      this.autoLogout(tokenExpirationIn);
    }
  }

  autoLogout(expiresIn: number){
    console.log(expiresIn)
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expiresIn);
  }

  private HandleAuthentication(
    email: string,
    id: string,
    token: string,
    expiresIn: number
  ) {
    let expiryDate: Date = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new UserData(email, id, token, expiryDate);
    this.userSubject.next(user);
    localStorage.setItem(this.tokenKey, JSON.stringify(user));
    this.autoLogout(expiresIn * 1000);
  }

  private handleError = (errResp: HttpErrorResponse) => {
    let errorMessage = "UnKnown Error Occured";
    if (!errResp.error || !errResp.error.error) {
      throwError(errorMessage);
    }
    switch (errResp.error.error.message) {
      case "EMAIL_EXISTS":
        errorMessage = "Error: this Email is Exist!";
        break;
      case "EMAIL_NOT_FOUND":
        errorMessage = "Error: this Email is not Exist!";
        break;
      case "INVALID_PASSWORD":
        errorMessage = "Error: Invalid Password!";
        break;
    }
    return throwError(errorMessage);
  }
}
