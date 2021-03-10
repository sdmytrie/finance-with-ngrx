import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/api/login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ): Promise<any> {
    return this.authService.login(username, password);
  }
}
