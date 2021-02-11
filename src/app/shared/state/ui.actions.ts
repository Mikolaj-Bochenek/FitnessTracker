import { createAction } from '@ngrx/store';

export enum UIActionType {
  StartLoading = '[UI] Start Loading',
  StopLoading = '[UI] Stop Loading',
}

export const StartLoading = createAction(
  UIActionType.StartLoading
);

export const StopLoading = createAction(
  UIActionType.StopLoading
);
