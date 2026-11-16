import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto.js';
import { UpdateBookDto } from './dto/update-book.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity.js';
import { Not, Repository } from 'typeorm';
import { Category } from '../categories/entities/category.entity.js';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) { }

  // Tạo mới sách
  async create(createBookDto: CreateBookDto) {
    const existsBook = await this.bookRepository.findOne({
      where: {
        name: createBookDto.name
      }
    });

    if (existsBook) {
      throw new BadRequestException('Book exists');
    }

    const existsCategory = await this.categoryRepository.findOne({
      where: {
        id: createBookDto.categoryId,
      },
    });

    if (!existsCategory) {
      throw new NotFoundException('Category not found');
    }

    const book = {
      ...createBookDto,
      createAt: new Date(),
      updateAt: new Date(),
      category: existsCategory,
    };

    return this.bookRepository.save(book);
  }

  findAll() {
    return this.bookRepository.find({
      relations: {
        category: true,
      },
    });
  }

  findOne(id: string) {
    return this.bookRepository.findOne({
      where: {
        id,
      },
      relations: {
        category: true,
      },
    });
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    const existsBook = await this.bookRepository.findOne({
      where: {
        name: updateBookDto.name,
        id: Not(id),
      },
    });

    if (existsBook) {
      throw new BadRequestException('Name is exists');
    }

    const book = await this.bookRepository.findOne({
      where: {
        id,
      },
    });

    if (!book) {
      throw new BadRequestException('Book not found');
    }

    let existsCategory = null;
    if (updateBookDto.categoryId && book?.category?.id !== updateBookDto.categoryId) {
      existsCategory = await this.categoryRepository.findOne({
        where: {
          id: updateBookDto.categoryId,
        },
      });

      if (!existsCategory) {
        throw new BadRequestException('Category not found');
      }
    }

    book.author = updateBookDto.author || book.author;
    book.name = updateBookDto.name || book.name;
    book.price = updateBookDto.price || book.price;
    book.category = existsCategory || book.category;
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
