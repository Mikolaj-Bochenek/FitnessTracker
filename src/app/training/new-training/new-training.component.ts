import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises$: Observable<any>;

  constructor(
    private trainingService: TrainingService,
    private db: AngularFirestore) { }

  ngOnInit(): void {
    this.exercises$ = this.db.collection('availableExercises').snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              ...doc.payload.doc.data() as Exercise[]
            };
          });
        })
      );
  }

  onStartTraining(form: NgForm): void {
    this.trainingService.startExercise(form.value.exercise);
  }
}
