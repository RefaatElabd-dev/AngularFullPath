import { Action } from '@ngrx/store';
import { Ingrediant } from './../../shared/Ingrediant.Model';

export const ADD_INGREDIANT = '[Shopping List] Add Ingrediant';
export const ADD_INGREDIANTS = '[Shopping List] Add Ingrediants';
export const UPDATE_INGREDIANT = '[Shopping List] Update Ingrediant';
export const DELETE_INGREDIANT = '[Shopping List] Delete Ingrediant';
export const START_EDIT = '[Shopping List] Start Edit';
export const STOP_EDIT = '[Shopping List] Stop Edit';

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