import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { JwtPayload } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  signJwt(user: User): string {
    return this.jwtService.sign({ name: user.name, roles: user.roles });
  }
  verifyJwt(token: string) {
    return this.jwtService.verify(token);
  }
}
