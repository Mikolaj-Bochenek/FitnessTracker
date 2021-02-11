import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs';
import { getAuthSelector } from 'src/app/auth/state';
import { AuthState } from 'src/app/auth/state/ui.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();
  isAuth$: Observable<boolean>;

  constructor(
    private store: Store<AuthState>,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.isAuth$ = this.store.select(getAuthSelector);
  }

  onCloseSidenav(): void {
    this.closeSidenav.emit();
  }

  onLogout(): void {
    this.authService.logout();
    this.onCloseSidenav();
  }
}
