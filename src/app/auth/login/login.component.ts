import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from '../../shared/ui.service';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UIState } from '../../shared/state/ui.reducer';
import { getLoadingSelector } from '../../shared/state/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>;
  private loadingSub: Subscription;

  constructor(
    private authServie: AuthService,
    // private uiService: UIService,
    private store: Store<UIState>) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(getLoadingSelector);
    // this.loadingSub = this.uiService.loadingStateChanged.subscribe(isLoading => {
    //   this.isLoading = isLoading;
    // });
  }

  ngOnDestroy(): void {
    if (this.loadingSub) {
      this.loadingSub.unsubscribe();
    }
  }

  onSubmit(form: NgForm): void {
    this.authServie.login({
      email: form.value.email,
      password: form.value.password
    });
  }
}
