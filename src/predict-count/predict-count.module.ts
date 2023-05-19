import { DataSampleItemEntity } from 'src/data-sample-item/data-sample-Item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PredictCountService } from './predict-count.service';
import { PredictCountController } from './predict-count.controller';
import { PredictCountEntity } from './predict-count.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PredictCountEntity]),
    TypeOrmModule.forFeature([DataSampleItemEntity]),
  ],
  controllers: [PredictCountController],
  providers: [PredictCountService],
})
export class PredictCountModule {}
