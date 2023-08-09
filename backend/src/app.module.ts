import { Module } from '@nestjs/common';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    // eslint-disable-next-line
   // ServeStaticModule.forRoot({
    // eslint-disable-next-line
     // rootPath: join(__dirname, '..', '..', 'frontend', 'dist', 'frontend'),
    // eslint-disable-next-line
 //   }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
