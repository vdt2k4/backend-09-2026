import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { BorrowBookService } from './borrow-book.service.js';
import { CreateBorrowBookDto } from './dto/create-borrow-book.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decarator.js';
import { Role } from '../common/enums/role.enum.js';
import { ReturnBorrowBookDto } from './dto/return-borrow_book.dto.js';

@Controller('borrow-book')
export class BorrowBookController {
  constructor(private readonly borrowBookService: BorrowBookService) { }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER)
  create(@Req() req: any, @Body() createBorrowBookDto: CreateBorrowBookDto) {
    const user = req.user;
    const userId = user.id;
    return this.borrowBookService.create(userId, createBorrowBookDto);
  }

  @Get()
  findAll() {
    return this.borrowBookService.findAll();
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.borrowBookService.findOne(+id);
  }


  // Admin API
  @Patch(':id/approve')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.LIBRARIAN)
  update(@Param('id') id: string) {
    return this.borrowBookService.approveBorrow(id);
  }

  @Patch(':id/reject')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.LIBRARIAN)
  reject(@Param('id') id: string) {
    return this.borrowBookService.rejectBorrow(id);
  }

  @Patch(':id/return')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.LIBRARIAN)
  return(@Param('id') id: string, @Body() returnBorrowBookDto: ReturnBorrowBookDto) {
    return this.borrowBookService.returnBorrow(id, returnBorrowBookDto);
  }
}
