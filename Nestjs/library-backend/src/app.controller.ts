import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService
  ) { }

  @Get()
  getHello(): string {
    const port = this.configService.get<number>('PORT');
    const nodeENV = this.configService.get<string>('NODE_ENV');
    return `ENV ${nodeENV} with port= ${port}`;
    return this.appService.getHello();
  }
}
