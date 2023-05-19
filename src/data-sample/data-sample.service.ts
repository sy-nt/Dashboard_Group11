/* eslint-disable prefer-const */
import { DataSampleItemDto } from './../data-sample-item/data-sample-item.dto';
import {
  DataSampleDto,
  DataSampleResDto,
  ESort,
  getDataSampleFilterDto,
} from './data-sample.dto';
import { DataSampleItemEntity } from 'src/data-sample-item/data-sample-Item.entity';
import { DataSampleEntity } from './data-sample.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Like, Repository } from 'typeorm';
import { plainToClass, plainToInstance } from 'class-transformer';
import * as fs from 'fs';
import dataSample from '../../data/data.json';
import * as v4 from 'uuidv4';
import { PaginationDto } from '@/paginate/paginate.dto';
@Injectable()
export class DataSampleService implements OnModuleInit {
  private data: any;
  constructor(
    @InjectRepository(DataSampleEntity)
    private readonly dataSampleRepository: Repository<DataSampleEntity>,
    @InjectRepository(DataSampleItemEntity)
    private readonly dataSampleItemRepository: Repository<DataSampleItemEntity>,
  ) {
    this.data = dataSample;
  }
  async onModuleInit() {
    const hasData = await this.checkDataExistence();
    if (!hasData) {
      // create initial data
      this.create();
    }
  }
  // check database has data
  async checkDataExistence(): Promise<boolean> {
    const count = await this.dataSampleRepository.count();
    return count > 0;
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
  async getListData(paginate: PaginationDto): Promise<DataSampleResDto> {
    const { page = 1, limit = 10 } = paginate;

    const [data, count] = await this.dataSampleRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: data,
      meta: {
        total: count,
        page: page,
        last_page: Math.ceil(count / limit),
      },
    };
  }
  async getListDataByFilter(
    filterDto: getDataSampleFilterDto,
    paginateDto: PaginationDto,
  ): Promise<DataSampleResDto> {
    const { search, sort } = filterDto;
    const { page = 1, limit = 10 } = paginateDto;
    const query = this.dataSampleRepository.createQueryBuilder('data_sample');
    if (search) {
      query.andWhere('data_sample.name_data LIKE :name_data', {
        name_data: `%${search}%`,
      });
    }
    // const dataAfterFilter = await this.dataSampleRepository.find({
    //   where: {
    //     name_data: Like(`%${search}%`),
    //   },
    //   order: {
    //     name_data: sort as 'ASC' | 'DESC',
    //   },
    // });
    const [data, count] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('data_sample.name_data', ESort[sort])
      .getManyAndCount();
    return {
      data: data,
      meta: {
        total: count,
        page: page,
        last_page: Math.ceil(count / limit),
      },
    };
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
