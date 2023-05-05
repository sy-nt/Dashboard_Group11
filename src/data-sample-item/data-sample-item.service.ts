import { Injectable } from '@nestjs/common';
import { DataSampleItemEntity } from './data-sample-Item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataSampleItemAnalysisDto } from './data-sample-item.dto';

@Injectable()
export class DataSampleItemService {
    constructor(@InjectRepository(DataSampleItemEntity)
    private readonly dataSampleItemRepository: Repository<DataSampleItemEntity>){}
    async getDataAnalytics(): Promise<DataSampleItemAnalysisDto[]>{
        const result:DataSampleItemAnalysisDto[] = []
         const statusCounts = await this.dataSampleItemRepository.createQueryBuilder('data_analysis)')
        .select('status as name')
        .addSelect('COUNT(*) as data')
        .groupBy('status')
        .getRawMany();
        return statusCounts
    }
}
