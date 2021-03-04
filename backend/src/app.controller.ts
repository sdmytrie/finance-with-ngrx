import { Controller, Get, Res } from '@nestjs/common';
import * as path from "path"
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(@Res() response): void {
    // the homepage will load our index.html which contains angular logic
    response.sendFile(path.resolve('./dist/frontend/index.html'));
  }

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
}
