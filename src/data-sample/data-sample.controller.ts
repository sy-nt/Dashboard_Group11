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
  UseGuards,
} from '@nestjs/common';
import { DataSampleService } from './data-sample.service';
import * as v4 from 'uuidv4';
import { JwtAuthGuard } from '@/auth/guards/jwt.guard';
import { plainToClass } from 'class-transformer';
import { PaginationDto } from '@/paginate/paginate.dto';
@Controller('data-sample')
export class DataSampleController {
  constructor(private readonly dataSampleService: DataSampleService) {}
  @Post('/data')
  async createData(): Promise<DataSampleDto> {
    return this.dataSampleService.create();
  }
  @UseGuards(JwtAuthGuard)
  @Get('/data')
  async getListData(
    @Query() Q_filterDto,
    @Query() Q_paginateDto,
  ): Promise<DataSampleDto[]> {
    try {
      const filterDto = plainToClass(getDataSampleFilterDto, Q_filterDto, {
        excludeExtraneousValues: true,
      });
      const paginateDto = plainToClass(PaginationDto, Q_paginateDto, {
        excludeExtraneousValues: true,
      });
      if (paginateDto.page < 1) {
        throw new BadRequestException('Invalid page number');
      } else {
        if (filterDto && Object.keys(filterDto).length > 0) {
          return await this.dataSampleService.getListDataByFilter(
            filterDto,
            paginateDto,
          );
        } else {
          return await this.dataSampleService.getListData(paginateDto);
        }
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  @UseGuards(JwtAuthGuard)
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
