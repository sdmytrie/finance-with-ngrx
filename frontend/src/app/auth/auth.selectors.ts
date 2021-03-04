import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './reducers';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const isLoggedIn = createSelector(
  selectAuthState,
  (auth) => !!auth.user
);

export const isLoggedOut = createSelector(isLoggedIn, (loggedIn) => !loggedIn);

export const getProfile = createSelector(
  selectAuthState,
  (auth) => auth.user?.payload
);

export const getJWT = createSelector(
  selectAuthState,
  (auth) => auth.user?.jwt_token
);
