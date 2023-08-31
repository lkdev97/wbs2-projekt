import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      /*cookie: {
        maxAge: 1 * 60 * 1000,
      },*/
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('QUIZ API')
    .setDescription('Ein QUIZ Game API')
    .setVersion('1.0')
    .addTag('Revolutionäre Game')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
