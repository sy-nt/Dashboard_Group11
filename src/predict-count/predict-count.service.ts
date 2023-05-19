import { DataSampleItemEntity } from 'src/data-sample-item/data-sample-Item.entity';

import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PredictCountEntity } from './predict-count.entity';
import { PredictCountDto } from './predict-count.dto';

@Injectable()
export class PredictCountService{
    constructor(@InjectRepository(DataSampleItemEntity)
    private readonly dataSampleItemRepository: Repository<DataSampleItemEntity>,
    @InjectRepository(DataSampleItemEntity)
    private readonly predictCountRepository: Repository<PredictCountEntity>
    ){}
    
}
