import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Account } from '../model/account';
import { AccountEntityService } from '../services/account-entity.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  accounts$!: Observable<Account[]>;

  constructor(private accountsService: AccountEntityService) { }

  ngOnInit(): void {
    this.accounts$ = this.accountsService.entities$;
  }

}
