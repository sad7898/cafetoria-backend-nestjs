import { Role } from './jwt.constant';

export class JwtPayload {
  name: string;
  roles: Role[];
  id: string;
}
