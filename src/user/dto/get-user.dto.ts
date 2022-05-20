import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';
import { Role } from 'src/auth/jwt.constant';
import { Post } from 'src/post/entities/post.entity';

export class Profile {
  @Expose()
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @Expose()
  @IsEmail()
  email: string;

  @ApiProperty()
  @Expose()
  roles: Role[];
}
