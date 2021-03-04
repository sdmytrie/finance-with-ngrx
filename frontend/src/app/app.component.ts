import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { login, logout } from './auth/auth.actions';
import { isLoggedIn, isLoggedOut, getProfile } from './auth/auth.selectors';
import { AppState } from './reducers';

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

  isLoggedIn$!: Observable<boolean>;
  isLoggedOut$!: Observable<boolean>;
  profile$!: Observable<Profile>;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    const user = localStorage.getItem('user');

    if (user) {
      this.store.dispatch(login({ user: JSON.parse(user) }));
    }

    this.isLoggedIn$ = this.store.pipe(select(isLoggedIn));

    this.isLoggedOut$ = this.store.pipe(select(isLoggedOut));

    this.profile$ = this.store
      .pipe(select(getProfile))
      .pipe(map((data) => data as Profile));
  }

  logout() {
    this.store.dispatch(logout());
    this.router.navigateByUrl('/login');
  }
}
