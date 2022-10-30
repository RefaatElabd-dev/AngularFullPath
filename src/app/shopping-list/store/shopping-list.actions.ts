import { Action } from '@ngrx/store';
import { Ingrediant } from './../../shared/Ingrediant.Model';

export const ADD_INGREDIANT = 'ADD_INGREDIANT';
export const ADD_INGREDIANTS = 'ADD_INGREDIANTS';
export const UPDATE_INGREDIANT = 'UPDATE_INGREDIANT';
export const DELETE_INGREDIANT = 'DELETE_INGREDIANT';
export const START_EDIT = 'START_EDIT';
export const STOP_EDIT = 'STOP_EDIT';

export class AddIngridant implements Action{
    readonly type = ADD_INGREDIANT;
    constructor(public payload: Ingrediant) {}
}

export class AddIngridants implements Action{
    readonly type = ADD_INGREDIANTS;
    constructor(public payload: Ingrediant[]) {}
}

export class UpdateIngridant implements Action{
    readonly type = UPDATE_INGREDIANT;
    constructor(public payload: Ingrediant) {}
}

export class DeleteIngridant implements Action{
    readonly type = DELETE_INGREDIANT;
    constructor() {}
}

export class StartEdit implements Action{
    readonly type = START_EDIT;
    constructor(public payload: number) {}
}

export class StopEdit implements Action{
    readonly type = STOP_EDIT;
}


export type SelectedAction =
  | AddIngridant
  | AddIngridants
  | UpdateIngridant
  | DeleteIngridant
  | StartEdit
  | StopEdit;