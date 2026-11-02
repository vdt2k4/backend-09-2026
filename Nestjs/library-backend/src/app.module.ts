import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module.js';
import { CategoriesModule } from './categories/categories.module.js';
import { BooksModule } from './books/books.module.js';
import { BorrowBookModule } from './borrow-book/borrow-book.module.js';
import { User } from './users/entities/user.entity.js';
import { Category } from './categories/entities/category.entity.js';
import { Book } from './books/entities/book.entity.js';
import { BorrowBook } from './borrow-book/entities/borrow-book.entity.js';
import { AuthModule } from './auth/auth.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [User, Category, Book, BorrowBook], // Chỉ định các entitty ở đâu
        synchronize: true, // Tự động tạo bảng từ Entities (chỉ dùng ở Local)
        logging: true, // Log SQL query, chỉ dùng ở local/dev hoặc khi cần debug
        ssl: {
          rejectUnauthorized: false,
        }
      }),
    }),

    UsersModule,
    CategoriesModule,
    BooksModule,
    BorrowBookModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
