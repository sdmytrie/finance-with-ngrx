import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { noop } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/reducers';
import { AuthService } from '../auth.service';
import { login } from '../auth.actions';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.form = fb.group({
      username: ['serge', [Validators.required]],
      password: ['_Azerty1', [Validators.required]],
    });
  }

  ngOnInit() {}

  login() {
    const val = this.form.value;
    this.auth
      .login(val.username, val.password)
      .pipe(
        tap((user) => {
          this.store.dispatch(login({ user }));
        }),
        tap((data) => {
          this.router.navigateByUrl('/accounts');
        })
      )
      .subscribe(noop, (error) => console.log('login failed: ', error));
  }
}
