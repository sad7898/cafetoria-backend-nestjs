import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { JwtPayload } from './auth.interface';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private configService: ConfigService) {}
  signJwt(user: User, id: string): string {
    return this.jwtService.sign({ id: id, name: user.name, roles: user.roles });
  }
  verifyJwt(token: string) {
    return this.jwtService.verify(token);
  }
}
