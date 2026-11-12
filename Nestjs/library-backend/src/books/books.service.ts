import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto.js';
import { UpdateBookDto } from './dto/update-book.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity.js';
import { Not, Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) { }

  // Tạo mới sách
  async create(createBookDto: CreateBookDto) {
    const book = await this.bookRepository.findOne({
      where: {
        name: createBookDto.name
      },
    });
    if (book) {
      throw new BadRequestException('Category exists');
    }

    const newBook = this.bookRepository.create({
      name: createBookDto.name,
      createAt: new Date(),
      updateAt: new Date(),
    });
    return this.bookRepository.save(newBook);
  }

  findAll() {
    return this.bookRepository.find();
  }

  findOne(id: string) {
    return this.bookRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    const existsBook = await this.bookRepository.findOne({
      where: {
        name: updateBookDto.name,
        id: Not(id),
      }
    });

    if (existsBook) {
      throw new BadRequestException('Name exists');
    }

    const book = await this.bookRepository.findOne({
      where: {
        id,
      },
    });
    if (!book) {
      throw new BadRequestException('Book not found');
    }

    book.name = updateBookDto.name || book.name;
    book.updateAt = new Date();
    return this.bookRepository.save(book);
  }

  async remove(id: string) {
    const category = await this.bookRepository.findOne({
      where: {
        id,
      },
    });
    if (!category) {
      throw new BadRequestException('Book not found');
    }
    return this.bookRepository.delete(id);
  }
}
