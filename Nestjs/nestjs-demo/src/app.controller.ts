import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards} from '@nestjs/common';
import { BooksService } from './app.service.js';
import {CreateBookDto} from "./books/dto/create.book.dto.js";
import {UpdateBookDto} from "./books/dto/update.book.dto.js";
import {AuthGuard} from "./books/guards/auth.guard.js";

@Controller("books")
export class BooksController {
  constructor(private readonly appService: BooksService) { }
// Xây dựng một API quản lý danh sách với các chức năng  sau:
  // - Thêm mới danh sách
  // - Lấy danh sách tất cả các sách
  // - Lấy thông tin chi tiết một cuốn sách theo id.
  // - Cập nhật thông tin sách theo id.
  // - Chỉ cho phép tác giả cập nhật và xoá sách (Middleware, Guard).
  
  // Thêm mới danh sách
  @Post('')
  createBook(@Body()createBookDto:CreateBookDto  ){
    return this.appService.createBook(createBookDto);
  }
  
  // Lấy danh sách tất cả các sách
  @Get('')
  findAll(){
    return this.appService.findAll();
  }
  
  // Lấy ra thông tin chi tiết một cuốn sách theo id
  
  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id:number){
    return this.appService.findOne(id);
  }
  
  // Cập nhật thông tin theo sách id. Chỉ được cho phép cập nhật (Middleware, Guard)
  @Put(':id')
  //@UseGuards(AuthGuard)
  updateBook(@Param('id',ParseIntPipe) id:number,@Body() updateBookDto:UpdateBookDto) {
    return this.appService.updateBook(id,updateBookDto);
  }
  
  // Xoá một cuốn sách theo id. Chỉ được cho phép cập nhật (Middleware, Guard)
  @Delete(':id')
  //@UseGuards(AuthGuard)
  deleteBook(@Param('id',ParseIntPipe) id:number){
    this.appService.deleteBook(id);
  }
}
