import { Injectable } from '@nestjs/common';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { PrismaService } from 'src/prisma/prisma.service';

const wordPerPage: number = +process.env.WORD_PER_PAGE;

@Injectable()
export class WordsService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createWordDto: CreateWordDto) {
    let word = null;
    try {
      word = this.prismaService.word.create({ data: createWordDto });
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }

    return word;
  }

  findAll(page: number) {
    // The page start from 0
    return this.prismaService.word.findMany({
      skip: (page - 1) * wordPerPage,
      take: wordPerPage,
    });
  }

  async findCount() {
    return await this.prismaService.word.count();
  }

  findWords(word: string) {
    return this.prismaService.word.findMany({
      where: {
        word: {
          contains: word,
        },
      },
    });
  }

  update(id: number, updateWordDto: UpdateWordDto) {
    return this.prismaService.word.update({
      where: { id },
      data: updateWordDto,
    });
  }

  remove(id: number) {
    return this.prismaService.word.delete({ where: { id } });
  }
}
