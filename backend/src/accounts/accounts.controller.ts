import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';

import { AccountsService } from './accounts.service';
import { Account } from './account.schema';
import { AuthenticationGuard } from '../guards/authentication.guard';

@Controller('/api/accounts')
@UseGuards(AuthenticationGuard)
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  async findAll(): Promise<{ data: Account[] }> {
    return this.accountsService.findAll().then((accounts) => {
      return { data: accounts };
    });
  }

  @Get(':id')
  async find(@Param('id') id: string): Promise<Account> {
    const account = await this.accountsService.findById(id);
    if (!account) {
      throw new NotFoundException('Could not found account.');
    }
    return account;
  }
}
