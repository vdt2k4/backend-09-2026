import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto.js';
import { User } from '../users/entities/user.entity.js';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../common/enums/role.enum.js';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto.js';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,

  ) { }

  async create(registerDto: RegisterDto) {
    if (registerDto.password !== registerDto.retypePassword) {
      throw new BadRequestException('Mật khẩu không khớp');
    }
    const { email, password, phone, fullName } = registerDto;
    // B1: Check email đã tồn tại chưa
    const existingUser = await this.userRepository.findOne({ where: { email: email.trim() } });
    if (existingUser) {
      throw new BadRequestException('Email đã tồn tại');
    }
    // B2: Tạo user mới
    // Tạo mã salt và hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password.trim(), salt);
    const newUser = this.userRepository.create({
      email: email.trim(),
      password: hashedPassword,
      phone: phone.trim(),
      fullName: fullName.trim(),
      isActive: true,
      role: Role.USER,  // Mặc định role là USER
      createAt: new Date(),
      updateAt: new Date()
    })
    await this.userRepository.save(newUser);
    return {
      message: 'Đăng ký thành công',
      user: {
        id: newUser.id,
        email: newUser.email,
        phone: newUser.phone,
        fullName: newUser.fullName,
        role: newUser.role
      }
    }
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // B1: Check email tồn tại chưa
    const user = await this.userRepository.findOne({ where: { email: email.trim() } });
    if (!user) {
      throw new BadRequestException('Account not found');
    }
    // B2: Check tài khoản isActive
    if (!user.isActive) {
      throw new ForbiddenException('Account inactive');
    }

    // B3: Check password
    const isPasswordValid = bcrypt.compareSync(password.trim(), user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Password invalid');
    }

    // Tạo Token JWT (nếu cần) và trả về thông tin user
    // 3 thành phần chính của JWT: Header, Payload, Signature
    const jwtpayload = {
      sub: user.id,
      email: user.email, // Optional
      role: user.role // Optional
    }
    // Kí nội dung payload vào token bằng secret key
    const jwtToken = this.jwtService.sign(jwtpayload);

    //B4: Return user info after Login success
    return {
      message: 'Login thành công',
      accessToken: jwtToken,
      user: {
        id: user.id,
        fullName: user.fullName
      }
    }
  }

}
