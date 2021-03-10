import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountsComponent } from './home/accounts.component';
import {
  EntityDataService,
  EntityDefinitionService,
  EntityMetadataMap,
} from '@ngrx/data';

import { AngularMaterialModule } from '../angular-material.module';
import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountsDataService } from './services/accounts-data.service';
import { EditAccountDialogComponent } from './edit-account-dialog/edit-account-dialog.component';
import { DeleteAccountDialogComponent } from './delete-account-dialog/delete-account-dialog.component';

@NgModule({
  declarations: [
    AccountsComponent,
    EditAccountDialogComponent,
    DeleteAccountDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    AccountsRoutingModule,
  ],
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
