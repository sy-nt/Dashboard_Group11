import { DataSampleItemDto } from './../data-sample-item/data-sample-item.dto';
import { DataSampleDto, getDataSampleFilterDto } from './data-sample.dto';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { DataSampleService } from './data-sample.service';
import { CreateDataSampleInput } from 'src/common/base.dto';
import * as v4 from 'uuidv4';
@Controller('data-sample')
export class DataSampleController {
  constructor(private readonly dataSampleService: DataSampleService) {}

  @Post('/data')
  async createData(): Promise<DataSampleDto> {
    return this.dataSampleService.create();
  }
  @Get('/data')
  async getListData(
    @Query() filterDto: getDataSampleFilterDto,
  ): Promise<DataSampleDto[]> {
    if (Object.keys(filterDto).length) {
      return this.dataSampleService.getListDataByFilter(filterDto);
    }
    return this.dataSampleService.getListData();
  }
  @Get('/data/:id')
  getListDataItem(
    @Query() filterDto: getDataSampleFilterDto,
    @Param('id') id: string,
  ): Promise<DataSampleItemDto[]> {
    if (!Object.keys(filterDto).length) {
      return this.dataSampleService.getAllItemsByDataSample(id);
    }
    return this.dataSampleService.getItemsByFilter(filterDto, id);
  }
}
