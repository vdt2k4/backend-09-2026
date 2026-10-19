import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './books/dto/createbook.dto.js';
import { UpdateBookDto } from './books/dto/update.dto.js';
import { create } from 'domain';
import { Book } from './books/interface/book.interface.js';


@Injectable()
export class BooksService {

  private books: Book[] = [];

  private idcounter = 1;

  // Thêm sách mới
  createBook(createBookDto: CreateBookDto): Book {
    const newBook: Book = {
      id: this.idcounter++,
      ...createBookDto
    }
    this.books.push(newBook);
    return newBook;
  }

  // Lấy danh sách tất cả các sách
  findAll(): Book[] {
    return this.books;
  }

  // Lấy thông tin chi tiết một cuốn sách theo id
  findOne(id: number): Book {
    const book = this.books.find(e => e.id === id);
    if (!book) {
      throw new NotFoundException(`Không tìm thấy sách với ID ${id}`)
    }
    return book;
  }

  // Cập nhật thông tin sách theo id
  update(id: number, updateBookDto: UpdateBookDto): Book {
    const book = this.findOne(id);
    const updatedBook = { ...book, ...updateBookDto };
    this.books = this.books.map((b) => (b.id === id ? updatedBook : b));
    return updatedBook;
  }

  // Xoá một cuốn sách theo id.
  remove(id: number): void {
    const bookinDex = this.books.findIndex(e => e.id === id);
    if (bookinDex === -1) {
      throw new NotFoundException(`Không tìm thấy sách với ID ${id}`)
    }
    this.books.splice(bookinDex, 1);
  }
}
