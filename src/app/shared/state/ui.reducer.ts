import { createReducer, on } from '@ngrx/store';
import * as UIActions from './ui.actions';

// We use interfaces for each slice of state.
// We define an interface that describes the structure of that state
export interface UIState {
  isLoading: boolean;
}

// If the state has not yet been modified,
// the components gets initial value of the state as setting the reducer.
// We should explicitly define initial values for each bit of state.
const initialState: UIState = {
  isLoading: false
};

export const uiReducer = createReducer<UIState>(
  initialState,
  on(UIActions.StartLoading, (state): UIState => {
    return {
      ...state,
      isLoading: true
    };
  }),
  on(UIActions.StopLoading, (state): UIState => {
    return {
      ...state,
      isLoading: false
    };
  })
);
