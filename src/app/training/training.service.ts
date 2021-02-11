import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';

import { Subject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/internal/operators/map';
import { Subscription } from 'rxjs/Subscription';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import { UIState } from '../shared/state/ui.reducer';
import * as UIActions from '../shared/state/ui.actions';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();

  private runningExercise: Exercise;
  private availableExercises: Exercise[] = [];
  private fireSubs: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<UIState>) { }

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
        this.availableExercises = exercises;
        this.exercisesChanged.next([...this.availableExercises]);
      }, () => {
        this.store.dispatch(UIActions.StopLoading());
        this.uiService.showSnackbar('Fetching exercises failed, lease try again later', null, 3000);
        this.exercisesChanged.next(null);
      }));
  }

  getRunningExercise(): Exercise {
    return { ...this.runningExercise };
  }

  fetchCompletedOrCancelledExercises(): void {
    this.fireSubs.push(this.db.collection('finishedExercises').valueChanges().subscribe((exercises: Exercise[]) => {
      this.finishedExercisesChanged.next(exercises);
    }));
  }

  startExercise(selectedId: string): void {
    // this.db.doc('availableExercises/' + selectedId).update({ lastSelected: new Date() });
    this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  completeExercise(): void {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number): void {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'cancelled',
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100)
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  private addDataToDatabase(exercise: Exercise): void {
    this.db.collection('finishedExercises').add(exercise);
  }

  canselSubscriptions(): void {
    this.fireSubs.forEach(sub => sub.unsubscribe());
  }
}
