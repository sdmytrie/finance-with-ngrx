import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

import { AccountsComponent } from './home/accounts.component';

// const routes: Routes = [
//   { path: '', component: AccountsComponent, canActivate: [AuthGuard] },
// ];
const routes: Routes = [
  { path: '', component: AccountsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountsRoutingModule {}
