import { DataSampleItemDto } from './../data-sample-item/data-sample-item.dto';
import {
  DataSampleAnalysisDto,
  DataSampleDto,
  DataSampleResDto,
  getDataSampleFilterDto,
} from './data-sample.dto';
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
import { PaginationDto } from '@/data-sample/paginate/paginate.dto';
import { DateRangeDto } from './dateRange/date-range.dto';
@Controller('data-sample')
export class DataSampleController {
  constructor(private readonly dataSampleService: DataSampleService) {}
  @Post('/data')
  async createData(): Promise<DataSampleDto> {
    return this.dataSampleService.create();
  }
  // @UseGuards(JwtAuthGuard)
  @Get('/data')
  async getListData(
    @Query() Q_filterDto,
    @Query() Q_paginateDto,
    @Query() Q_dateRangeDto,
  ): Promise<any> {
    try {
      const filterDto = plainToClass(getDataSampleFilterDto, Q_filterDto, {
        excludeExtraneousValues: true,
      });
      const paginateDto = plainToClass(PaginationDto, Q_paginateDto);
      const dateRangeDto = plainToClass(DateRangeDto, Q_dateRangeDto);
      if (paginateDto.page < 1) {
        throw new BadRequestException('Invalid page number');
      } else {
        if (filterDto && Object.keys(filterDto).length > 0) {
          return await this.dataSampleService.getListDataByFilter(
            filterDto,
            paginateDto,
            dateRangeDto
          );
        } else {
          return await this.dataSampleService.getListData(paginateDto, dateRangeDto);
        }
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  @UseGuards(JwtAuthGuard)
  @Get('data/analysis')
  getDataSampleAnalysis():Promise<DataSampleAnalysisDto>{
    return this.dataSampleService.getDataSampleAnalysis()
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
