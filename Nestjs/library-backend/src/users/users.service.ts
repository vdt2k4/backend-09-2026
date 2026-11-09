import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { Not, Repository } from 'typeorm';
import { User } from './entities/user.entity.js';
import { ChangePasswordDto } from './dto/change-password.dto.js';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { AdminChangePasswordDto } from './dto/admin.change-password.dto.js';
import { Role } from '../common/enums/role.enum.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) { }

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

  // Me
  async getProfile(id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    const avatarUrl = `${this.configService.get<string>('BASE_URL')}/${user?.avatar}`;
    return {
      id: user?.id,
      email: user?.email,
      fullName: user?.fullName,
      phone: user?.phone,
      role: user?.role,
      avatar: user?.avatar ? avatarUrl : null,
    }
  }


  // Change Password bởi User, không cần Admin
  async changePassword(reqUser: any, changePasswordDto: ChangePasswordDto) {

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

  // Thêm, thay đổi Avatar.
  async changeAvatar(reqUser: any, file: Express.Multer.File) {
    const user = await this.userRepository.findOne({
      where: {
        id: reqUser.id,
      }
    });

    if (!user) {
      throw new Error('User not found');
    }
    if (!user.isActive) {
      throw new BadRequestException('User is not active')
    }

    user.avatar = file.path;
    user.updateAt = new Date();

    await this.userRepository.save(user);
    return {
      message: 'Avatar changed successfully'
    };
  }

  // Change password users thông qua Admin.
  async adminChangePassword(adminChangePassword: AdminChangePasswordDto) {
    const user = await this.userRepository.findOne({
      where: {
        id: adminChangePassword.userId
      }
    });

    if (!user) {
      throw new Error('User Not Found');
    }

    if (!user.isActive) {
      throw new BadRequestException('User is not active')
    }

    //Kiểm tra mật khẩu mới, có trùng với RetypePassword không ?
    if (adminChangePassword.newPassword !== adminChangePassword.confirmPassword) {
      throw new BadRequestException('New password and confirm password do not match');

    }

    // Mật khẩu mới không trùng mật khẩu cũ
    const isMatchNewPassword = await bcrypt.compare(adminChangePassword.newPassword, user.password);
    if (isMatchNewPassword) {
      throw new BadRequestException('New password is the same as old password')
    }

    const newHashedPassword = await bcrypt.hash(adminChangePassword.newPassword, 10);
    user.password = newHashedPassword;
    user.updateAt = new Date();
    await this.userRepository.save(user);

    return {
      message: 'Password changed successfully',
    };
  }

  // Lấy ra tất cả các users, ngoại trừ Admin
  async adminGetAllUsers(adminId: string) {
    const users = await this.userRepository.find({
      where: {
        id: Not(adminId),
      },
      select: {
        'id': true,
        'fullName': true,
        'phone': true,
        'email': true,
        'role': true,
        'isActive': true,
      }
    });
    return users;
  }


  // Tạo users thông qua Admin
  async createUser(createUserDto: CreateUserDto) {
    const email = createUserDto.email.trim();
    // B1: Kiểm tra email đã tồn tại chưa
    const existingUser = await this.userRepository.findOne({
      where: {
        email,
      }
    });
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }
    // B2: Hash mật khẩu
    const hashedPassword = await bcrypt.hash(createUserDto.password.trim(), 10);
    // B3: tạo và lưu user mới
    const newUser = this.userRepository.create({
      email,
      password: hashedPassword,
      fullName: createUserDto.fullName.trim(),
      phone: createUserDto.phone?.trim(),
      role: createUserDto.role ?? Role.USER,
      isActive: createUserDto.isActive ?? true,
      createAt: new Date(),
      updateAt: new Date(),
    });
    await this.userRepository.save(newUser);
    // B4: Không trả password
    return {
      message: 'User created successfully',
      user: {
        id: newUser.id,
        email: newUser.email,
        fullName: newUser.fullName,
        phone: newUser.phone,
        role: newUser.role,
        isActive: newUser.isActive,
      }
    };
  }

  // Cập nhật thông tin user theo Id(chỉ Admin mới chỉnh sửa được)
  async adminUpdateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Cập nhật thông tin (field nào không gửi thì giữ nguyên giá trị cũ)
    user.fullName = updateUserDto.fullName?.trim() ?? user.fullName;
    user.phone = updateUserDto.phone?.trim() ?? user.phone;
    user.role = updateUserDto.role ?? user.role;
    user.isActive = updateUserDto.isActive ?? user.isActive;
    user.updateAt = new Date();

    await this.userRepository.save(user);
    return {
      message: 'User updated successfully',
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        phone: user.phone,
        role: user.role,
        isActive: user.isActive,
      },
    };
  }

}
