import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './ui.actions';

// We use interfaces for each slice of state.
// We define an interface that describes the structure of that state
export interface AuthState {
  isAuthenticated: boolean;
}

// If the state has not yet been modified,
// the components gets initial value of the state as setting the reducer.
// We should explicitly define initial values for each bit of state.
const initialState: AuthState = {
  isAuthenticated: false
};

export const authReducer = createReducer<AuthState>(
  initialState,
  on(AuthActions.SetAuthenticated, (state): AuthState => {
    return {
      ...state,
      isAuthenticated: true
    };
  }),
  on(AuthActions.SetUnauthenticated, (state): AuthState => {
    return {
      ...state,
      isAuthenticated: false
    };
  })
);
