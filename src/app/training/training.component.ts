import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TrainingState } from './state/training.reducer';
import { Observable } from 'rxjs';
import { getIsTrainingSelector } from './state/index';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  ongoingTraining$: Observable<boolean>;

  constructor(private store: Store<TrainingState>) { }

  ngOnInit(): void {
    this.ongoingTraining$ = this.store.select(getIsTrainingSelector);
  }
}
