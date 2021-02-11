import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UIState } from './ui.reducer';

// This function allow us to get the feature slice of state, simply by specifying its future name.
const getUIFeatureState = createFeatureSelector<UIState>('ui');

// This function allows us to get any bit of state by composing selectors to navigate down the state tree.
// Selector should be a pure function, with no side effects.
export const getLoadingSelector = createSelector(
  getUIFeatureState,
  state => state.isLoading
);
