import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import { BooksController } from './app.controller.js';
import { BooksService } from './app.service.js';
import {AuthMiddleware} from "./books/middleware/auth.middleware.js";

@Module({
  imports: [],
  controllers: [BooksController],
  providers: [BooksService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
        .forRoutes({path: 'books/:id', method: RequestMethod.PUT},{path: 'books/:id', method: RequestMethod.DELETE});
  }
}
