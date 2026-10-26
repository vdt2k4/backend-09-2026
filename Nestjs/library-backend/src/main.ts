import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

// Cách 1: Sử dụng dotenv
// require('dotenv').config();
// import dotenv from 'dotenv';
// dotenv.config();
// console.log('PORT from ENV', process.env.PORT);
// console.log('Node ENV', process.env.NODE_ENV);

// Cách 2: Sử dụng NestJS
// Cài đặt Configuration
// Async
// TypeORM
async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT');


  await app.listen(process.env.PORT ?? 3000);

  Logger.log(`Application is runing on: ${port}`);
}
await bootstrap();
