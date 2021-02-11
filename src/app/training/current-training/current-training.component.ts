import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../training.service';
import { TrainingState } from '../state/training.reducer';
import { Store } from '@ngrx/store';
import { getActiveTrainingSelector } from '../state/index';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: any;

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService,
    private store: Store<TrainingState>) {}

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  startOrResumeTimer(): void {
    this.store.select(getActiveTrainingSelector).pipe(take(1)).subscribe(exercise => {
      const step = exercise.duration / 100 * 1000;
      this.timer = setInterval(() => {
        this.progress = this.progress + 1;
        if (this.progress >= 100) {
          this.trainingService.completeExercise();
          clearInterval(this.timer);
        }
      }, step);
    });
  }

  onStop(): void {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'exit') {
        this.trainingService.cancelExercise(this.progress);
      } else if (result === 'continue') {
        this.startOrResumeTimer();
      }
    });
  }
}
