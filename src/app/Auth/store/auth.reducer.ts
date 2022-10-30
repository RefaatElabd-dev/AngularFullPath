
import { Action } from '@ngrx/store';
import { UserData } from './../UserData';

export interface State {
    user: UserData
}

const intialState: State = {
    user: new UserData('', '', '', new Date())
}

export function authReducer( state = intialState, action: Action){
    return state;
}