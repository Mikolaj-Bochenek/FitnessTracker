import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TrainingState } from './training.reducer';

// Extends the app state to include the product feature.
// This is required because trainings are lazy loaded.
// So the reference to TrainingState cannot be added to app.state.ts directly.
export interface State extends TrainingState {
  training: TrainingState;
}

// This function allow us to get the feature slice of state, simply by specifying its future name.
const getTrainingFeatureState = createFeatureSelector<TrainingState>('training');

// This function allows us to get any bit of state by composing selectors to navigate down the state tree.
// Selector should be a pure function, with no side effects.
export const getAvailableTrainingsSelector = createSelector(
  getTrainingFeatureState,
  state => state.availableExercises
);

export const getFinishedTrainingsSelector = createSelector(
  getTrainingFeatureState,
  state => state.finishedExercises
);

export const getActiveTrainingSelector = createSelector(
  getTrainingFeatureState,
  state => state.activeTraining
);

export const getIsTrainingSelector = createSelector(
  getTrainingFeatureState,
  state => state.activeTraining != null
);
