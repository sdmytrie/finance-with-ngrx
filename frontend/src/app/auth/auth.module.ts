import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../angular-material.module';
import { StoreModule } from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { authReducer } from './reducers';
import { AuthGuard } from './auth.guard';
import { AuthEffects } from './auth.effects';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: 'login', component: LoginComponent }]),
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent],
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [AuthService, AuthGuard],
    };
  }
}
