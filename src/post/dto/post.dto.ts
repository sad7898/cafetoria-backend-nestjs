import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
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
