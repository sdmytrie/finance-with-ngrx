import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Account } from '../model/account';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountsDataService extends DefaultDataService<Account> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Account', http, httpUrlGenerator);
  }

  getAll(): Observable<Account[]> {
    return this.http
      .get('/api/accounts')
      .pipe(map((res: any) => Object.values(res.data) as Account[]));
  }
}