import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [], // Chỉ định các entitty ở đâu
        synchronize: true, // Tự động tạo bảng từ Entities (chỉ dùng ở Local)
        logging: true, // Log SQL query, chỉ dùng ở local/dev hoặc khi cần debug
        ssl: {
          rejectUnauthorized: false,
        }
      }),
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
