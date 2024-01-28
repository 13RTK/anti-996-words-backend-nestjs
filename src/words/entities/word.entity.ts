import { ApiProperty } from '@nestjs/swagger';
import { Word } from '@prisma/client';

export class WordEntity implements Word {
  @ApiProperty()
  id: number;

  @ApiProperty()
  word: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  description_cn: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
