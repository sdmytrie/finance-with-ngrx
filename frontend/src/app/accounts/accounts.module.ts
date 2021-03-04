import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsComponent } from './home/accounts.component';
import {
  EntityDataService,
  EntityDefinitionService,
  EntityMetadataMap,
} from '@ngrx/data';

import { AngularMaterialModule } from '../angular-material.module';
import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountsDataService } from './services/accounts-data.service';

@NgModule({
  declarations: [AccountsComponent],
  imports: [CommonModule, AngularMaterialModule, AccountsRoutingModule],
  providers: [],
})
export class AccountsModule {
  constructor(
    private eds: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private accountsDataService: AccountsDataService
  ) {
    this.entityDataService.registerService('Account', this.accountsDataService);
  }
}
