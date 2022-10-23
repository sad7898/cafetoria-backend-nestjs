import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { Post } from '../entities/post.entity';
import { Filter } from '../post.interface';

export class CreatePostDto {
  @ApiProperty()
  @MaxLength(100)
  @IsString()
  topic: string;

  @ApiProperty()
  @IsString()
  text: string;

  @ApiProperty()
  @IsArray()
  tags: string[];
}

export class UpdatePostDto extends PartialType(CreatePostDto) {}
export class PostFilterDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  sortKey?: string;
  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  tags?: string[];
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  topic?: string;
}
export class PostQuery {
  @ApiProperty()
  @IsNumber()
  page: number;
}
export class IsLikedResponse {
  @ApiProperty({ type: Boolean })
  isLiked: boolean;
}
export class PostResponse extends Post {}
export class BulkPostResponse {
  @ApiProperty({ type: [Post] })
  posts: Post[];
  @ApiProperty({ type: Number, required: false })
  count: number;
}
