import { Controller, Get, NotFoundException, Param, UseGuards } from '@nestjs/common';

import { UsersService } from './users.service';
import { User, UserDocument } from './user.schema';
import { AuthenticationGuard } from '../guards/authentication.guard';

@Controller('/api/users')
@UseGuards(AuthenticationGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':username')
  async find(@Param('username') username: string): Promise<User> {
    const user = await this.usersService.findOne(username);
    if(!user) {
      throw new NotFoundException("Could not found user for username " + username);
    }
    return user;
  }
}
