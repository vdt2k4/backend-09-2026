import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { BooksService } from './app.service.js';
import { CreateBookDto } from './books/dto/createbook.dto.js';
import { UpdateBookDto } from './books/dto/update.dto.js';
import { Book } from './books/interface/book.interface.js';

@Controller("books")
export class BooksController {
  constructor(private readonly appService: BooksService) { }

  @Post('')
  create(@Body() createBookDto: CreateBookDto): CreateBookDto {
    return this.appService.createBook(createBookDto);
  }

  @Get('')
  findAll(): Book[] {
    return this.appService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.appService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateBookDto: UpdateBookDto) {
    return this.appService.update(id, updateBookDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    this.appService.remove(id);
    return { message: `Đã xoá thành công sách có ID: ${id}` };
  }
}
