import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

import { Account, AccountSchema } from './account.schema';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { environment } from 'src/environments/environment';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
    JwtModule.register({
      secret: environment.secret,
      signOptions: { expiresIn: environment.expiresIn },
    }),
  ],
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AccountsModule {}
