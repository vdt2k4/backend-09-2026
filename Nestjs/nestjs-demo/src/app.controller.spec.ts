import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './app.controller.js';
import { BooksService } from './app.service.js';

describe('AppController', () => {
  let appController: BooksController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksService],
    }).compile();

    appController = app.get<BooksController>(BooksController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.findAll()).toBe('Hello World!');
    });
  });
});
