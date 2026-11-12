import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto.js';

// Update kế thừ từ Create User Dto
export class UpdateUserDto extends PartialType(CreateUserDto) { }
