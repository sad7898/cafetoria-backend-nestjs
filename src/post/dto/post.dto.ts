import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
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
export class GetPostDto extends Filter {
  @ApiProperty()
  @IsNumber()
  page: number;
}
