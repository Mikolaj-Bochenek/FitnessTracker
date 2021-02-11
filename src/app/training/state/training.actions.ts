import { createAction, props } from '@ngrx/store';
import { Exercise } from '../exercise.model';

export enum TrainingActionType {
  SetAvailableTrainings = '[Training] Set Available Trainings',
  SetFinishedTrainings = '[Training] Set Finished Trainings',
  StartTraining = '[Training] Start Training',
  StopTraining = '[Training] Stop Training',
}

export const SetAvailableTrainings = createAction(
  TrainingActionType.SetAvailableTrainings,
  props<{ exercises: Exercise[] }>()
);

export const SetFinishedTrainings = createAction(
  TrainingActionType.SetFinishedTrainings,
  props<{ exercises: Exercise[] }>()
);

export const StartTraining = createAction(
  TrainingActionType.StartTraining,
  props<{ exercise: Exercise }>()
);

export const StopTraining = createAction(
  TrainingActionType.StopTraining
);
