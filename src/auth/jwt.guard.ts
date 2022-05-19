import { ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { resolveSoa } from 'dns';
import { JwtPayload } from './auth.interface';
import { Role } from './jwt.constant';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

@Injectable()
export class UserGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const valid = await super.canActivate(context);
    if (!valid) throw new UnauthorizedException();
    const payload: JwtPayload = context.switchToHttp().getRequest().user;
    const validRoles = Object.keys(Role).filter((item) => {
      return isNaN(Number(item));
    });
    if (!payload.roles.find((role) => validRoles.includes(role))) throw new ForbiddenException();
    return true;
  }
}
