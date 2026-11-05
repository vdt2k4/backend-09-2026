import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class LoginDto {
    @IsEmail({}, { message: 'Email không đúng định dạng' })
    @IsNotEmpty({ message: 'Email không được để trống' })

    email: string;
    @IsNotEmpty({ message: 'Password không được để trống' })
    @MinLength(6)
    password: string;
}