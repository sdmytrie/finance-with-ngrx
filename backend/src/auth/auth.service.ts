import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User, UserDocument } from '../users/user.schema';
import { UsersService } from '../users/users.service';
import { environment } from '../environments/environment';

interface Payload {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService
  ) {}

  private async validate(username: string): Promise<User> {
    return this.usersService.findOne(username);
  }

  public async login(
    username: string,
    password: string
  ): Promise<{ jwt_token: string, payload: Payload, expiresIn: number }> {
    const user = await this.validate(username);

    if (!user) {
      throw new NotFoundException('user does not exist.');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new UnauthorizedException('wrong password');
    }

    const payload: Payload = {
      email: user.email,
      username: username,
      first_name: user.first_name,
      last_name: user.last_name,
    };
    const accessToken = this.jwtService.sign(payload);

    return {
      jwt_token: accessToken,
      expiresIn: environment.expiresIn,
      payload
    };
  }
}
