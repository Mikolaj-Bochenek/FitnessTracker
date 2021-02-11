import { createReducer, on } from '@ngrx/store';
import * as TrainingActions from './training.actions';
import { Exercise } from '../exercise.model';

// We use interfaces for each slice of state.
// We define an interface that describes the structure of that state
export interface TrainingState {
  availableExercises: Exercise[];
  finishedExercises: Exercise[];
  activeTraining: Exercise;
}

// If the state has not yet been modified,
// the components gets initial value of the state as setting the reducer.
// We should explicitly define initial values for each bit of state.
const initialState: TrainingState = {
  availableExercises: [],
  finishedExercises: [],
  activeTraining: null
};

export const trainingReducer = createReducer<TrainingState>(
  initialState,
  on(TrainingActions.SetAvailableTrainings, (state, action): TrainingState => {
    return {
      ...state,
      availableExercises: action.exercises
    };
  }),
  on(TrainingActions.SetFinishedTrainings, (state, action): TrainingState => {
    return {
      ...state,
      finishedExercises: action.exercises
    };
  }),
  on(TrainingActions.StartTraining, (state, action): TrainingState => {
    return {
      ...state,
      activeTraining: action.exercise
    };
  }),
  on(TrainingActions.StopTraining, (state): TrainingState => {
    return {
      ...state,
      activeTraining: null
    };
  })
);
