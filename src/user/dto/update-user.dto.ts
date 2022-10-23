import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, Validate, IsBoolean } from 'class-validator';
import { Post } from 'src/post/entities/post.entity';
import { IsValidCharacter } from '../user.validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  createdPosts?: Post[];
  likedPosts?: Post[];
}

export class UpdateLikedPostResult {
  @IsBoolean()
  isUnliked: boolean;
}
