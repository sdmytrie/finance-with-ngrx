import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountsComponent } from './home/accounts.component';
import { AccountsResolver } from './services/accounts.resolver';

const routes: Routes = [
  {
    path: '',
    component: AccountsComponent,
    resolve: {
      accounts: AccountsResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountsRoutingModule {}
