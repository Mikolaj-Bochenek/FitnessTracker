import { createAction } from '@ngrx/store';

export enum AuthActionType {
  SetAuthenticated = '[Auth] Set Authenticated',
  SetUnauthenticated = '[Auth] Set Unauthenticated',
}

export const SetAuthenticated = createAction(
  AuthActionType.SetAuthenticated
);

export const SetUnauthenticated = createAction(
  AuthActionType.SetUnauthenticated
);
