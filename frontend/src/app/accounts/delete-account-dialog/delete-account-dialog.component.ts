import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AccountEntityService } from '../services/account-entity.service';
import { Account } from '../model/account';

@Component({
  selector: 'app-delete-account-dialog',
  templateUrl: './delete-account-dialog.component.html',
  styleUrls: ['./delete-account-dialog.component.css'],
})
export class DeleteAccountDialogComponent implements OnInit {
  account!: Account;

  constructor(
    private dialogRef: MatDialogRef<DeleteAccountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) account: Account,
    private accountsService: AccountEntityService
  ) {
    this.account = account;
  }

  ngOnInit(): void {}

  onDelete(account: Account): void {
    this.accountsService.delete(account._id);
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
