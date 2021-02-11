import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';

import { Subject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/internal/operators/map';
import { Subscription } from 'rxjs/Subscription';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as UIActions from '../shared/state/ui.actions';
import * as TrainingActions from './state/training.actions';
import { State } from '../state/app.state';
import { getActiveTrainingSelector } from './state/index';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();

  private fireSubs: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<State>) { }

  fetchAvailableExercises(): void {
    this.store.dispatch(UIActions.StartLoading());
    this.fireSubs.push(this.db.collection('availableExercises').snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              ...doc.payload.doc.data() as {}
            };
          });
        })
      ).subscribe((exercises: Exercise[]) => {
        this.store.dispatch(UIActions.StopLoading());
        this.store.dispatch(TrainingActions.SetAvailableTrainings({ exercises }));
      }, () => {
        this.store.dispatch(UIActions.StopLoading());
        this.uiService.showSnackbar('Fetching exercises failed, lease try again later', null, 3000);
        this.exercisesChanged.next(null);
      }));
  }

  fetchCompletedOrCancelledExercises(): void {
    this.fireSubs.push(this.db.collection('finishedExercises').valueChanges().subscribe((exercises: Exercise[]) => {
      this.store.dispatch(TrainingActions.SetFinishedTrainings({ exercises }));
    }));
  }

  startExercise(selectedId: string): void {
    this.store.dispatch(TrainingActions.StartTraining({ selectedId }));
  }

  completeExercise(): void {
    this.store.select(getActiveTrainingSelector).pipe(take(1)).subscribe(exercise => {
      this.addDataToDatabase({
        ...exercise,
        date: new Date(),
        state: 'completed'
      });
      this.store.dispatch(TrainingActions.StopTraining());
    });
  }

  cancelExercise(progress: number): void {
    this.store.select(getActiveTrainingSelector).pipe(take(1)).subscribe(exercise => {
      this.addDataToDatabase({
        ...exercise,
        date: new Date(),
        state: 'cancelled',
        duration: exercise.duration * (progress / 100),
        calories: exercise.calories * (progress / 100)
      });
      this.store.dispatch(TrainingActions.StopTraining());
    });
  }

  private addDataToDatabase(exercise: Exercise): void {
    this.db.collection('finishedExercises').add(exercise);
  }

  canselSubscriptions(): void {
    this.fireSubs.forEach(sub => sub.unsubscribe());
  }
}
