/* eslint-disable prefer-const */
import { DataSampleItemDto } from './../data-sample-item/data-sample-item.dto';
import { DataSampleDto, getDataSampleFilterDto } from './data-sample.dto';
import { DataSampleItemEntity } from 'src/data-sample-item/data-sample-Item.entity';
import { DataSampleEntity } from './data-sample.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Like, Repository } from 'typeorm';
import { plainToClass, plainToInstance } from 'class-transformer';
import * as fs from 'fs';
import dataSample from '../../data/data.json';
import * as v4 from 'uuidv4';
import { format } from 'date-fns';
@Injectable()
export class DataSampleService {
  private data: any;
  constructor(
    @InjectRepository(DataSampleEntity)
    private readonly dataSampleRepository: Repository<DataSampleEntity>,
    @InjectRepository(DataSampleItemEntity)
    private readonly dataSampleItemRepository: Repository<DataSampleItemEntity>,
  ) {
    this.data = dataSample;
  }
  async create(): Promise<DataSampleDto> {
    for (const [qnh, data] of Object.entries(dataSample)) {
      let newDataSample = this.dataSampleRepository.create();
      let dataSampleItems: DataSampleItemEntity[] = [];
      for (const [id, item] of Object.entries<DataSampleItemDto>(data)) {
        let date = new Date(item.date);
        let angle_id = item.angle_id;
        let status = item.status;
        let predict_result = item.predict_result;
        let valueRepo = this.dataSampleItemRepository.create({
          date,
          angle_id,
          status,
          predict_result,
          name: id,
        });
        dataSampleItems.push(valueRepo);
      }
      newDataSample.name_data = qnh;
      newDataSample.dataSampleItemsDto = dataSampleItems;
      await this.dataSampleRepository.save(newDataSample);
    }

    return plainToInstance(
      DataSampleDto,
      {},
      {
        excludeExtraneousValues: true,
      },
    );
  }
  async getListData(): Promise<DataSampleDto[]> {
    const items = await this.dataSampleRepository.find();
    return items;
  }
  async getListDataByFilter(
    filterDto: getDataSampleFilterDto,
  ): Promise<DataSampleDto[]> {
    const { search, sort } = filterDto;
    const dataAfterFilter = await this.dataSampleRepository.find({
      where: {
        name_data: Like(`%${search}%`),
      },
      order: {
        name_data: sort as 'ASC' | 'DESC',
      },
    });
    return dataAfterFilter.map((item) => plainToClass(DataSampleDto, item));
  }
  async getAllItemsByDataSample(resId: string): Promise<DataSampleItemDto[]> {
    const isValidUuid = v4.isUuid(resId);

    if (!isValidUuid) {
      throw new BadRequestException(`Invalid UUID: ${resId}`);
    }
    const options: FindOneOptions<DataSampleEntity> = {
      relations: ['dataSampleItems'],
    };
    const dataSample = await this.dataSampleRepository.findOne({
      where: {
        id: resId,
      },
      relations: ['dataSampleItemsDto'],
    });

    if (!dataSample) {
      throw new NotFoundException(`Data sample with id ${resId} not found`);
    }

    return dataSample.dataSampleItemsDto.map((item) =>
      plainToClass(DataSampleItemDto, item),
    );
  }
  async getItemsByFilter(
    filterDto: getDataSampleFilterDto,
    resId: string,
  ): Promise<DataSampleItemDto[]> {
    const isValidUuid = v4.isUuid(resId);

    if (!isValidUuid) {
      throw new BadRequestException(`Invalid UUID: ${resId}`);
    }
    const options: FindOneOptions<DataSampleEntity> = {
      relations: ['dataSampleItems'],
    };
    const dataSample = await this.dataSampleRepository.findOne({
      where: {
        id: resId,
      },
      relations: ['dataSampleItemsDto'],
    });

    if (!dataSample) {
      throw new NotFoundException(`Data sample with id ${resId} not found`);
    }

    return dataSample.dataSampleItemsDto.map((item) =>
      plainToClass(DataSampleItemDto, item),
    );
  }
}
