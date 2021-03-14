import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Account, AccountDocument } from './account.schema';
import { AccountDto } from './account.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async create(accountDto: AccountDto, jwt: string): Promise<Account> {
    const tokenDecoded: any = this.jwtService.decode(jwt);

    const createdAccount = new this.accountModel(accountDto);
    createdAccount.user_id = tokenDecoded._id;
    await createdAccount.save();
    return createdAccount.toObject({ versionKey: false });
  }

  async update(updatedAccount: Account, id: string): Promise<Account> {
    await this.accountModel.updateOne({ _id: id }, updatedAccount);

    return updatedAccount;
  }

  findAll(jwt: string): Promise<Account[]> {
    const tokenDecoded: any = this.jwtService.decode(jwt);

    const user_id = tokenDecoded._id;
    return this.accountModel.find({ user_id: user_id }).exec();
  }

  findById(id: string): Promise<Account> {
    return this.accountModel.findById({ _id: id }).exec();
  }

  delete(id: string): Promise<any> {
    return this.accountModel.deleteOne({ _id: id }).exec();
  }
}
