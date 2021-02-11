import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { UIState } from '../../shared/state/ui.reducer';
import { getLoadingSelector } from '../../shared/state/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading$: Observable<boolean>;

  constructor(
    private authServie: AuthService,
    private store: Store<UIState>) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(getLoadingSelector);
  }

  onSubmit(form: NgForm): void {
    this.authServie.login({
      email: form.value.email,
      password: form.value.password
    });
  }
}
