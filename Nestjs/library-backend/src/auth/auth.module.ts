import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { User } from '../users/entities/user.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule as jwtmodule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './guards/jwt.strategy.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    jwtmodule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        // secret: configService.get<string>('JWT_SECRET'),
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRES'),
        },
        // signOptions: {
        //   expiresIn: `${configService.get<number>('JWT_EXPIRES') || 1}d`,
        // },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule { }
