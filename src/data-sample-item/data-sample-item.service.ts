import { Injectable } from '@nestjs/common';
import { DataSampleItemEntity } from './data-sample-Item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataSampleItemAnalysisDto } from './data-sample-item.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class DataSampleItemService {
  constructor(
    @InjectRepository(DataSampleItemEntity)
    private readonly dataSampleItemRepository: Repository<DataSampleItemEntity>,
  ) {}
  async getDataAnalytics(): Promise<DataSampleItemAnalysisDto> {
    const statusCounts = await this.dataSampleItemRepository
      .createQueryBuilder('status_counts')
      .select('status as name')
      .addSelect('COUNT(*) as data')
      .groupBy('status')
      .getRawMany();
    const predictResult = await this.dataSampleItemRepository
      .createQueryBuilder('frequency_predict')
      .select('predict_result')
      .getRawMany();

    const mergeArray = predictResult.reduce(
      (pre, cur) => pre.concat(cur.predict_result),
      [],
    );
    const frequencyPredict = new Map();
    mergeArray.forEach((data) => {
      if (!frequencyPredict[data]) frequencyPredict[data] = 1;
      else frequencyPredict[data]++;
    });

 
    let result = {
      status: statusCounts.map(({ name, data }) => ({
        name: name,
        data: Number(data),
      })),
      predict: frequencyPredict,
    };
    return result;
  }
}
