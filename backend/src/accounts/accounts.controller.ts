import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Headers,
  UseGuards,
  Delete,
  Put,
} from '@nestjs/common';

import { AccountsService } from './accounts.service';
import { Account } from './account.schema';
import { AuthenticationGuard } from '../guards/authentication.guard';

@Controller('/api/accounts')
@UseGuards(AuthenticationGuard)
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  async findAll(
    @Headers('authorization') jwt: string,
  ): Promise<{ data: Account[] }> {
    return this.accountsService.findAll(jwt).then((accounts) => {
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

  @Post()
  async create(
    @Body() data: Account,
    @Headers('authorization') jwt: string,
  ): Promise<Account> {
    const account = await this.accountsService.create(data, jwt);

    return account;
  }

  @Put(':id')
  async update(
    @Body() data: Account,
    @Param('id') id: string,
  ): Promise<Account> {
    const account = await this.accountsService.update(data, id);

    return account;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<string> {
    const count = await this.accountsService.delete(id);
    return count;
  }
}
