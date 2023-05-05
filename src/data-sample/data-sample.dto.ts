import { PaginationDto } from '@/paginate/paginate.dto';
import { DataSampleItemDto } from './../data-sample-item/data-sample-item.dto';
import { Expose, Type } from 'class-transformer';
import {
  IsEmpty,
  IsNotEmpty,
  ValidateNested,
  isNotEmpty,
} from 'class-validator';
import { Column } from 'typeorm';

export enum ESort {
  'asc' = 'ASC',
  'desc' = 'DESC',
}
export class DataSampleDto {
  @Expose()
  @IsNotEmpty()
  name_data: string;
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @Expose()
  @Type(() => DataSampleItemDto)
  dataSampleItemsDto: DataSampleItemDto[];
}
export class getDataSampleFilterDto {
  @Expose()
  search: string;
  @Expose()
  @Column({
    type: 'enum',
    enum: ESort,
  })
  sort;
}
