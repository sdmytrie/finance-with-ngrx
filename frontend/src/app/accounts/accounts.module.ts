import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsComponent } from './home/accounts.component';

import { AngularMaterialModule } from '../angular-material.module';
import { AccountsRoutingModule } from './accounts-routing.module';

@NgModule({
  declarations: [AccountsComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    AccountsRoutingModule,
  ]
})
export class AccountsModule { }
