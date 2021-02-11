import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { getAuthSelector } from './state';
import { AuthState } from './state/ui.reducer';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private store: Store<AuthState>,
    private router: Router) { }

  // no longer used after lazy loading added.
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.store.select(getAuthSelector).pipe(

      // Makes sure that we always just take the latest user value
      // and then unsubscribe for this guard execution.
      take(1));
  }

  canLoad(route: Route): any {
    return this.store.select(getAuthSelector).pipe(

      // Makes sure that we always just take the latest user value
      // and then unsubscribe for this guard execution.
      take(1));
  }
}
