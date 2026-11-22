import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class LoginDto {
    @ApiProperty()
    @IsEmail({}, { message: 'Email không đúng định dạng' })
    @IsNotEmpty({ message: 'Email không được để trống' })
    email: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Password không được để trống' })
    @MinLength(6)
    password: string;
}