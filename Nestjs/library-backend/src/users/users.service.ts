import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { In, Repository } from 'typeorm';
import { User } from './entities/user.entity.js';
import { ChangePasswordDto } from './dto/change-password.dto.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor() {
    @Injectable(User)
    private readonly userRepository: Repository<User>

  } { }
create(createUserDto: CreateUserDto) {
  return 'This action adds a new user';
}

findAll() {
  return `This action returns all users`;
}

findOne(id: number) {
  return `This action returns a #${id} user`;
}

update(id: number, updateUserDto: UpdateUserDto) {
  return `This action updates a #${id} user`;
}

remove(id: number) {
  return `This action removes a #${id} user`;
}
async getProfile(id: string) {
  const user = await this.userRepository.findOne({
    where: {
      id,
    },
  });
  return {
    id: user?.id,
    email: user?.email,
    fullName: user?.fullName,
    phone: user?.phone,

    role: user?.role,
  }
}
async changePassword(reqUser: any, changePasswordDto: ChangePasswordDto){

  const user = await this.userRepository.findOne({
    where: {
      id: reqUser.id,
    },
  });

  // B1: Kiểm tra tồn tại User
  if (!user) {
    throw new Error('User not found');
  }
  // B2: Kiểm tra User có bị khoá không
  if (!user.isActive) {
    throw new BadRequestException('User is not active');

  }
  // B3: So sánh mật khẩu cũ
  const isMatchOldPassword = await bcrypt.compare(changePasswordDto.oldPassword, user.password);
  if (!isMatchOldPassword) {
    throw new BadRequestException('Incorrect old password');

  }
  // B4: Kiểm tra mật khẩu mới, có trùng với RetypePassword không ?

  if (changePasswordDto.newPassword !== changePasswordDto.confirmPassword) {
    throw new BadRequestException('New password and confirm password do not match');

  }

  // B5: Mật khẩu mới không trùng mật khẩu cũ
  const isMatchNewPassword = await bcrypt.compare(changePasswordDto.newPassword, user.password);
  if (isMatchNewPassword) {
    throw new BadRequestException('New password is the same as old password')
  }
  const newHashedPassword = await bcrypt.hash(changePasswordDto.newPassword, 10);
  user.password = newHashedPassword;
  user.updateAt = new Date();

  await this.userRepository.save(user);
  return {
    message: 'Password changed successfuly',
  };
}
}
