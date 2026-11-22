import { Module } from '@nestjs/common';
import { BorrowBookService } from './borrow-book.service.js';
import { BorrowBookController } from './borrow-book.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowBook } from './entities/borrow-book.entity.js';
import { Book } from '../books/entities/book.entity.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([BorrowBook, Book]),
    AuthModule,
  ],
  controllers: [BorrowBookController],
  providers: [BorrowBookService],
})
export class BorrowBookModule { }
