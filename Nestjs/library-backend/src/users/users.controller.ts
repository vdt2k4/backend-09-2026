import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UseInterceptors, UploadedFile, ParseUUIDPipe, Query } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { Roles } from '../auth/decorators/roles.decarator.js';
import { Role } from '../common/enums/role.enum.js';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import type { Request, Express } from 'express'
import { ChangePasswordDto } from './dto/change-password.dto.js';
import { FileInterceptor } from '@nestjs/platform-express';
import 'multer';
import { diskStorage } from 'multer';
import { AdminChangePasswordDto } from './dto/admin.change-password.dto.js';
import { ToggleActiveDto } from './dto/toggle-active.dto.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  // === USER API ====
  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req: Request) {
    const user: any = req.user;
    return this.usersService.getProfile(user.id);
  }

  @Patch('/change-password')
  @UseGuards(JwtAuthGuard)
  changePassword(@Req() req: Request, @Body() changePasswordDto: ChangePasswordDto) {
    const reqUser: any = req.user;
    return this.usersService.changePassword(reqUser, changePasswordDto);
  }

  @Patch('/change-avatar')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('avatar', {
    storage: diskStorage({
      destination: './uploads/avatar',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('');
        return cb(null, `${randomName}_${file.originalname}`);
      }
    }),
    fileFilter: (req, file, cb) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Invalid file type'), false);
      }
      cb(null, true);
    }
  }))
  changeAvatar(@Req() req: Request, @UploadedFile() file: Express.Multer.File) {
    const reqUser: any = req.user;
    // console.log(file);
    // return 'UploadFile';
    return this.usersService.changeAvatar(reqUser, file);
  }

  // === ADMIN API ====

  // Tạo tại tài khoản
  @Post('admin/add-user')
  @UseGuards(JwtAuthGuard, RolesGuard)
  // Role Admin
  @Roles(Role.ADMIN)
  addUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }


  // Thay đổi mật khẩu
  @Patch('/admin/change-user-password')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  adminChangePassword(@Body() changePasswordDto: AdminChangePasswordDto) {
    return this.usersService.adminChangePassword(changePasswordDto);
  }

  // Lấy ra tất cả users
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN || Role.LIBRARIAN)
  findAll(@Query('email') email: string, @Query('phone') phone: string, @Query('role') role: string) {
    const queryParams = {
      email,
      phone,
      role,
    };
    return this.usersService.findAll(queryParams);
  }

  // // Cập nhật thông tin user theo Id
  // @Patch('admin/:id')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.ADMIN)
  // adminUpdateUser(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.adminUpdateUser(id, updateUserDto);
  // }

  // Xem thông tin chi tiết của user
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN || Role.LIBRARIAN)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  // Cập nhật thông tin user theo id
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  // Xoá User theo id
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  // Active, inactive.
  @Patch(':id/toggle-active')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  toggleActive(@Param('id') id: string, @Body() toggleActiveDto: ToggleActiveDto) {
    return this.usersService.toggleActive(id, toggleActiveDto);
  }

}
