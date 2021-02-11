import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import { UIState } from '../shared/state/ui.reducer';
import * as UIActions from '../shared/state/ui.actions';
import * as AuthActions from './state/ui.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private fireAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UIService,
    private store: Store<UIState>) { }

  initAuthListener(): void {
    this.fireAuth.authState.subscribe(user => {
      if (user) {
        this.store.dispatch(AuthActions.SetAuthenticated());
        this.router.navigate(['/training']);
      } else {
        this.trainingService.canselSubscriptions();
        this.store.dispatch(AuthActions.SetUnauthenticated());
        this.router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: AuthData): void {
    this.store.dispatch(UIActions.StartLoading());
    this.fireAuth.createUserWithEmailAndPassword(authData.email, authData.password)
    .then(() => {
      this.store.dispatch(UIActions.StopLoading());
    })
    .catch(error => {
      this.store.dispatch(UIActions.StopLoading());
      this.uiService.showSnackbar(error.message, null, 3000);
    });
  }

  login(authData: AuthData): void {
    this.store.dispatch(UIActions.StartLoading());
    this.fireAuth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(() => {
        this.store.dispatch(UIActions.StopLoading());
      })
      .catch(error => {
        this.store.dispatch(UIActions.StopLoading());
        this.uiService.showSnackbar(error.message, null, 3000);
      });
  }

  logout(): void {
    this.fireAuth.signOut();
  }
}
