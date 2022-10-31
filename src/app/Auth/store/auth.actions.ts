export const LOGIN = 'LOGIN';
import { Action } from '@ngrx/store';
export const LOGOUT = 'LOGOUT';


export class Login implements Action {
    readonly type = LOGIN;
    constructor(public payload: { email: string, id: string, token: string, expirationDate: Date}) { }
}


export class Logout implements Action {
    readonly type = LOGOUT;
}

export type AuthActions = Login | Logout;

