import { DataSampleItemModule } from './../data-sample-item/data-sample-item.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { DataSampleController } from './data-sample.controller';
import { DataSampleService } from './data-sample.service';
import { DataSampleEntity } from './data-sample.entity';
import { DataSampleItemEntity } from 'src/data-sample-item/data-sample-Item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DataSampleEntity]),TypeOrmModule.forFeature([DataSampleItemEntity])],
  controllers: [DataSampleController],
  providers: [
    DataSampleService,
  ],
})
export class DataSampleModule {}
