import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataSampleService } from './data-sample/data-sample.service';

@Injectable()
export class AppService{
  
  getHello(): string {
    return 'Hello World!';
  }
}
