import { Module } from '@nestjs/common';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { FriendshipModule } from './friendship/friendship.module';
import { QuestionModule } from './question/question.module';
import { DuelModule } from './duel/duel.module';
import { StatisticsModule } from './statistics/statistics.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    // eslint-disable-next-line
   // ServeStaticModule.forRoot({
    // eslint-disable-next-line
     // rootPath: join(__dirname, '..', '..', 'frontend', 'dist', 'frontend'),
    // eslint-disable-next-line
 //   }),

    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'migration.sqlite3',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    AdminModule,
    FriendshipModule,
    QuestionModule,
    DuelModule,
    StatisticsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
