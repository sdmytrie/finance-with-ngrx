import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Account, AccountDocument } from './account.schema';
import { AccountDto } from './account.dto';

@Injectable()
export class AccountsService {
  constructor(@InjectModel(Account.name) private accountModel: Model<AccountDocument>) {}

  async create(accountDto: AccountDto): Promise<Account> {
    const createdAccount = new this.accountModel(AccountDto);
    await createdAccount.save();
    return createdAccount.toObject({ versionKey: false });
  }

  findAll(): Promise<Account[]> {
    return this.accountModel.find().exec();
  }

  findById(id: string): Promise<Account> {
    return this.accountModel.findById({ _id: id }).exec();
  }
}
