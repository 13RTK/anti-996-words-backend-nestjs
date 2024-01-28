import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateWordDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @ApiProperty()
  word: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsString()
  @ApiProperty()
  description_cn: string;
}
