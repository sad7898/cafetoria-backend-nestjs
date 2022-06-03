import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, MaxLength, IsString, IsNumber } from 'class-validator';

export class Filter {
  @ApiProperty()
  @IsOptional()
  tags: string[];

  @ApiProperty()
  @MaxLength(100)
  @IsString()
  topic: string;
}
