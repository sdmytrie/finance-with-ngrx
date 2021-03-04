import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AccountEntityService } from './account-entity.service';
import { filter, first, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AccountsResolver implements Resolve<boolean> {
  constructor(private accountsService: AccountEntityService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.accountsService.loaded$.pipe(
      tap((loaded) => {
        if (!loaded) {
          this.accountsService.getAll();
        }
      }),
      filter((loaded) => !!loaded),
      first()
    );
  }
}
