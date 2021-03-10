import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Account } from '../model/account';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { AccountEntityService } from '../services/account-entity.service';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { getProfile } from 'src/app/auth/auth.selectors';
import { map, tap } from 'rxjs/operators';
import { Profile } from 'src/app/shared/profile.model';

@Component({
  selector: 'app-account-dialog',
  templateUrl: './edit-course-dialog.component.html',
  styleUrls: ['./edit-course-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditAccountDialogComponent implements OnInit {
  form!: FormGroup;

  dialogTitle: string;

  account!: Account;
  profile$!: Observable<Profile>;

  mode: 'create' | 'update';

  loading$!: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditAccountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private accountsService: AccountEntityService,
    private store: Store<AppState>
  ) {
    this.dialogTitle = data.dialogTitle;
    this.account = data.account;
    this.mode = data.mode;

    const formControls = {
      name: ['', Validators.required],
      bank: ['', Validators.required],
      iban: [''],
      bic: [''],
    };

    if (this.mode === 'update') {
      this.form = this.fb.group(formControls);
      this.form.patchValue({ ...data.account });
    } else if (this.mode === 'create') {
      this.form = this.fb.group({
        ...formControls,
      });
    }
  }

  ngOnInit(): void {
    this.profile$ = this.store.pipe(select(getProfile)).pipe(
      map((data) => data as Profile),
      tap(console.log)
    );
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    const account: Account = {
      ...this.account,
      ...this.form.value,
    };

    if (this.mode === 'update') {
      this.accountsService.update(account);

      this.dialogRef.close();
    } else if (this.mode === 'create') {
      account.balance = 0;
      account.timetable = 0;
      account.is_favorite = true;
      account.quality = 'commun';
      this.accountsService.add(account).subscribe((newAccount) => {
        console.log('New Account', newAccount);

        this.dialogRef.close();
      });
    }
  }
}
