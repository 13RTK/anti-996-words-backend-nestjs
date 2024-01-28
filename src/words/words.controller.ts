import {
  Controller,
  Get,
  Body,
  Patch,
  Post,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  Logger,
  UseGuards,
} from '@nestjs/common';
import { WordsService } from './words.service';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { WordEntity } from './entities/word.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('words')
@ApiTags('words')
export class WordsController {
  constructor(
    private readonly wordsService: WordsService,
    private readonly logger: Logger,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: WordEntity })
  create(@Body() createWordDto: CreateWordDto) {
    this.logger.log(
      `[WordsController] Create new word {/words, POST}: params: ${JSON.stringify(
        createWordDto,
      )}`,
    );

    return this.wordsService.create(createWordDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: WordEntity, isArray: true })
  findAll(@Query('page', ParseIntPipe) page: number) {
    this.logger.log(
      `[WordsController] Request all words {/words/?page=${page}, GET}: params: ${JSON.stringify(
        {
          page,
        },
      )}`,
    );

    return this.wordsService.findAll(page);
  }

  @Get('count')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: Number })
  findCount() {
    return this.wordsService.findCount();
  }

  @Get('query')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: WordEntity, isArray: true })
  findWords(@Query('word') word: string) {
    this.logger.log(
      `[WordsController] Request all words {/words/query, GET}: query: ${word}`,
    );
    return this.wordsService.findWords(word);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: WordEntity })
  @ApiCreatedResponse({ type: WordEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWordDto: UpdateWordDto,
  ) {
    this.logger.log(
      `[WordsController] Update word {/words/:id, PATCH}: params: ${JSON.stringify(
        updateWordDto,
      )}`,
    );
    return this.wordsService.update(id, updateWordDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: WordEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    this.logger.log(
      `[WordsController] Remove word {/words/:id, DELETE}: params: ${id}`,
    );
    return this.wordsService.remove(id);
  }
}
