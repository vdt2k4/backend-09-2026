import { Module } from '@nestjs/common';
import { BooksController } from './app.controller.js';
import { BooksService } from './app.service.js';

@Module({
  imports: [],
  controllers: [BooksController],
  providers: [BooksService],
})
export class AppModule { }
