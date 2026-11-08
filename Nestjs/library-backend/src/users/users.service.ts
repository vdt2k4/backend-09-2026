import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { In, Repository } from 'typeorm';
import { User } from './entities/user.entity.js';


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
}
