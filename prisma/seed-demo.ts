import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // create two words
  const word1 = await prisma.word.create({
    data: {
      word: 'assume',
      description:
        "(verb) to accept something to be true without question or proof:     I assumed that you knew each other because you went to the same school. Let's assume that they're coming and make plans on that basis.",
      description_cn: 'CN',
    },
  });

  const word2 = await prisma.word.create({
    data: {
      word: 'proclaim',
      description:
        '(verb) to announce something publicly or officially, especially something positive:    All the countries have proclaimed their loyalty to the alliance. She was proclaimed Queen at the age of 13 after the sudden death of her father.',

      description_cn: 'CN',
    },
  });

  console.log({ word1, word2 });

  // create two users
  const ROUNDS_OF_HASHING: number = Number(process.env.ROUNDS_OF_HASHING);

  const user1HashedPassword: string = await bcrypt.hash(
    'password-alex',
    ROUNDS_OF_HASHING,
  );
  const user2HashedPassword: string = await bcrypt.hash(
    'password-ishmam',
    ROUNDS_OF_HASHING,
  );
  console.log(`hashed password: ${user1HashedPassword}`);
  console.log(`hashed password: ${user2HashedPassword}`);

  const user1 = await prisma.user.create({
    data: {
      username: 'alex',
      password: user1HashedPassword,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: 'ishmam',
      password: user2HashedPassword,
    },
  });

  console.log({ user1, user2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
