import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './ui.reducer';

// This function allow us to get the feature slice of state, simply by specifying its future name.
const getAuthFeatureState = createFeatureSelector<AuthState>('auth');

// This function allows us to get any bit of state by composing selectors to navigate down the state tree.
// Selector should be a pure function, with no side effects.
export const getAuthSelector = createSelector(
  getAuthFeatureState,
  state => state.isAuthenticated
);
