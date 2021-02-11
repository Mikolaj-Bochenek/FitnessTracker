import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { NgForm } from '@angular/forms';
import { Exercise } from '../exercise.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getLoadingSelector } from '../../shared/state/index';
import { State, getAvailableTrainingsSelector } from '../state/index';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises$: Observable<Exercise[]>;
  isLoading$: Observable<boolean>;

  constructor(
    private trainingService: TrainingService,
    private store: Store<State>) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(getLoadingSelector);
    this.exercises$ = this.store.select(getAvailableTrainingsSelector);
    this.fetchExercises();
  }

  fetchExercises(): void {
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm): void {
    this.trainingService.startExercise(form.value.exercise);
  }
}
