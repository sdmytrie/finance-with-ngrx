import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { Account } from '../model/account';

@Injectable({
  providedIn: 'root'
})
export class AccountEntityService extends EntityCollectionServiceBase<Account> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Account', serviceElementsFactory);
  }
}