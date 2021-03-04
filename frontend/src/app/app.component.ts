import { Component, OnInit } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountEntityService } from './accounts/services/account-entity.service';

import { login, logout } from './auth/auth.actions';
import { isLoggedIn, isLoggedOut, getProfile } from './auth/auth.selectors';
import { AppState } from './reducers';
import { Account } from './accounts/model/account';

interface Profile {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'frontend';
  loading = true;

  isLoggedIn$!: Observable<boolean>;
  isLoggedOut$!: Observable<boolean>;
  profile$!: Observable<Profile>;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private accountsService: AccountEntityService
  ) {}

  ngOnInit(): void {
    const user = localStorage.getItem('user');

    if (user) {
      this.store.dispatch(login({ user: JSON.parse(user) }));
    }

    this.router.events.subscribe((event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });

    this.isLoggedIn$ = this.store.pipe(select(isLoggedIn));

    this.isLoggedOut$ = this.store.pipe(select(isLoggedOut));

    this.profile$ = this.store
      .pipe(select(getProfile))
      .pipe(map((data) => data as Profile));
  }

  logout(): void {
    this.store.dispatch(logout());
    this.accountsService.clearCache();
    this.router.navigateByUrl('/login');
  }
}
