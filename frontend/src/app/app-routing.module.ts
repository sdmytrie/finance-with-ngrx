import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/accounts',
    pathMatch: 'full',
  },
  {
    path: 'accounts',
    loadChildren: () =>
      import('./accounts/accounts.module').then((m) => m.AccountsModule),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '/accounts',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AuthModule.forRoot()],
  exports: [RouterModule],
})
export class AppRoutingModule {}
