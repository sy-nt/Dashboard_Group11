import { Module } from '@nestjs/common';
import { DataSampleItemService } from './data-sample-item.service';
import { DataSampleItemController } from './data-sample-item.controller';
import { DataSampleItemEntity } from './data-sample-Item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([DataSampleItemEntity])],
  providers: [DataSampleItemService],
  controllers: [DataSampleItemController]
})
export class DataSampleItemModule {}
