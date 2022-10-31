import { UserData } from './../UserData';
import * as AuthActions from './auth.actions';

export interface State {
    user: UserData | null
}

const intialState: State = {
    user: null
}

export function authReducer( state = intialState, action: AuthActions.AuthActions) {
    switch(action.type){
        case AuthActions.LOGIN:
            const { email, id, token, expirationDate } = action.payload;
            let user = new UserData(email, id, token, expirationDate);
            return {
                ...state,
                user
            };
        case AuthActions.LOGOUT:
            return {
                ...state,
                user: null
            };
        default: return state;
    }
}