import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '../../auth/state/ui.reducer';
import { Observable } from 'rxjs';
import { getAuthSelector } from 'src/app/auth/state';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth$: Observable<boolean>;

  constructor(
    private store: Store<AuthState>,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.isAuth$ = this.store.select(getAuthSelector);
  }

  onToggleSidenav(): void {
    this.sidenavToggle.emit();
  }

  onLogout(): void {
    this.authService.logout();
  }
}
