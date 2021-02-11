import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Exercise } from '../exercise.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { UIState } from '../../shared/state/ui.reducer';
import { getLoadingSelector } from '../../shared/state/index';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  private exerciseSub: Subscription;

  exercises: Exercise[];
  isLoading$: Observable<boolean>;

  constructor(
    private trainingService: TrainingService,
    private store: Store<UIState>) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(getLoadingSelector);
    this.exerciseSub = this.trainingService.exercisesChanged.subscribe(exercises => {
      this.exercises = exercises;
    });
    this.fetchExercises();
  }

  ngOnDestroy(): void {
    if (this.exerciseSub) {
      this.exerciseSub.unsubscribe();
    }
  }

  onStartTraining(form: NgForm): void {
    this.trainingService.startExercise(form.value.exercise);
  }

  fetchExercises(): void {
    this.trainingService.fetchAvailableExercises();
  }
}
