import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, Validate } from 'class-validator';
import { IsValidCharacter } from '../user.validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
