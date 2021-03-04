import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { AuthService } from './auth.service';
import { AppState } from '../reducers';
import { getJWT } from './auth.selectors';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.pipe(select(getJWT)).pipe(
      take(1),
      exhaustMap((jwt) => {
        if (!jwt) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          setHeaders: {
            Authorization: jwt,
          },
        });
        return next.handle(modifiedReq);
      })
    );
    // return this.authService.user.pipe(
    //   take(1),
    //   exhaustMap((user) => {
    //     if (!user) {
    //       return next.handle(req);
    //     }
    //     const modifiedReq = req.clone({
    //       setHeaders: {
    //         Authorization: 'JWT ' + user.token,
    //       },
    //     });
    //     return next.handle(modifiedReq);
    //   })
    // );
  }
}
