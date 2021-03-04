import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GetJwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: () => void) {
    const authJwtToken = req.headers.authorization;

    if (!authJwtToken) {
      next();
      return;
    }

    try {
      const user = this.jwtService.verify(authJwtToken);

      if (user) {
        req['user'] = user;
      }
    } catch (err) {
      console.log('Error handling authentication JWT: ', err);
    }
    next();
  }
}
