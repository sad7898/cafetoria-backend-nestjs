import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, Validate, IsEmail } from 'class-validator';
import { IsValidCharacter } from '../user.validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(12)
  @Validate(IsValidCharacter, { message: 'Username must not contain invalid characters' })
  username: string;
  @ApiProperty()
  @IsString()
  @MinLength(7)
  @MaxLength(12)
  @Validate(IsValidCharacter, { message: 'Password must not contain invalid characters' })
  password: string;
  @ApiProperty()
  @IsEmail()
  email: string;
}

export class SignInDto {
  @ApiProperty()
  @IsString()
  userId: string;
  @ApiProperty()
  @IsString()
  @Validate(IsValidCharacter, { message: 'Password must not contain invalid characters' })
  password: string;
}
