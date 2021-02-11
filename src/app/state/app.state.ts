// Representation of the entire app state
// Extended by lazy loaded modules
// tslint:disable-next-line:no-empty-interface
import { ActionReducerMap } from '@ngrx/store';
import * as fromUI from '../shared/state/ui.reducer';
import * as fromAuth from '../auth/state/ui.reducer';

export interface State {
    ui: fromUI.UIState;
    auth: fromAuth.AuthState;
}

export const appReducer: ActionReducerMap<State> = {
    ui: fromUI.uiReducer,
    auth: fromAuth.authReducer
};
