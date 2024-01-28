import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { WordsModule } from './words/words.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';

@Module({
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
  imports: [
    PrismaModule,
    WordsModule,
    ConfigModule.forRoot(),
    UsersModule,
    ThrottlerModule.forRoot([
      {
        name: 'App-rate-limiter',
        limit: 10,
        ttl: 1000,
      },
    ]),
    AuthModule,
  ],
})
export class AppModule {}
