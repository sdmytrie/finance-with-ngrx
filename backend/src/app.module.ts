import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from './users/users.module';
import { environment } from './environments/environment';
import { AuthModule } from './auth/auth.module';
import { FrontendMiddleware } from './middlewares/frontend.middleware';
import { AccountsModule } from './accounts/accounts.module';
import { GetJwtMiddleware } from './middlewares/get-jwt.middleware';

@Module({
  imports: [
    MongooseModule.forRoot(environment.mongodb),
    JwtModule.register({
      secret: environment.secret,
      signOptions: { expiresIn: environment.expiresIn },
    }),
    UsersModule,
    AuthModule,
    AccountsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(GetJwtMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
    consumer.apply(FrontendMiddleware).forRoutes({
      path: '/**',
      method: RequestMethod.GET,
    });
  }
}
