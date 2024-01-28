import FileHelper from '../src/util/file.helper';
import { PrismaClient } from '@prisma/client';

type Word = {
  word: string;
  answer: string;
};

const prisma = new PrismaClient();

const readWords = async (): Promise<Word[]> => {
  // Local
  // const filePath = '/Users/alex/Projects/public/anti-996-words/anti-996-words-backend/data/Daily.json';

  // Remote server
  const filePath =
    '/root/private-project/anti-996-words/anti-996-words-backend/data/Daily.json';

  const data = await FileHelper.readFilePromise(filePath);
  const obj = JSON.parse(data);

  const words = obj.words.map((word: string) => {
    return JSON.parse(word);
  });

  return words;
};

const insertData = async () => {
  const words = await readWords();
  for (const word of words) {
    try {
      await prisma.word.create({
        data: {
          word: word.word,
          description: word.answer,
          description_cn: 'CN',
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
};

insertData();
