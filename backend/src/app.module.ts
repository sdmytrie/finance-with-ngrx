import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from './users/users.module';
import { environment } from './environments/environment';
import { AuthModule } from './auth/auth.module';
import { GetUserMiddleware } from './middlewares/get-user.middleware';
import { UsersController } from './users/users.controller';
import { FrontendMiddleware } from './middlewares/frontend.middleware';

@Module({
  imports: [
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '../../', 'frontend'),
    // }),
    MongooseModule.forRoot(environment.mongodb),
    JwtModule.register({
      secret: environment.secret,
      signOptions: { expiresIn: environment.expiresIn }
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(GetUserMiddleware).forRoutes(UsersController);
    consumer.apply(FrontendMiddleware).forRoutes(
      {
        path: '/**', // For all routes
        method: RequestMethod.GET, // For all methods
      },
    );
  }
}
