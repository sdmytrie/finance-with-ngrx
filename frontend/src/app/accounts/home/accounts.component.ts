import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { defaultDialogConfig } from 'src/app/shared/default-dialog-config';
import { Account } from '../model/account';
import { AccountEntityService } from '../services/account-entity.service';
import { EditAccountDialogComponent } from '../edit-account-dialog/edit-account-dialog.component';
import { DeleteAccountDialogComponent } from '../delete-account-dialog/delete-account-dialog.component';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
})
export class AccountsComponent implements OnInit {
  accounts$!: Observable<Account[]>;

  constructor(
    private dialog: MatDialog,
    private accountsService: AccountEntityService
  ) {}

  ngOnInit(): void {
    this.accounts$ = this.accountsService.entities$;
  }

  onAdd(): void {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: 'Create Account',
      mode: 'create',
    };

    this.dialog.open(EditAccountDialogComponent, dialogConfig);
  }

  onEdit(account: Account): void {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: 'Edit Account',
      mode: 'update',
      account: account,
    };

    this.dialog.open(EditAccountDialogComponent, dialogConfig);
  }

  onDelete(account: Account): void {
    // this.accountsService.delete(id);
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = account;

    const dialogRef = this.dialog.open(
      DeleteAccountDialogComponent,
      dialogConfig
    );
  }
}
