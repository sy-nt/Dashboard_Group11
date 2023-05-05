import { Type } from "class-transformer";
import { IsNotEmpty, ValidateNested } from "class-validator";
import { DataSampleItemDto } from "src/data-sample-item/data-sample-item.dto";
import { DataSampleDto } from "src/data-sample/data-sample.dto";

export class CreateDataSampleInput {
    @Type(() => DataSampleDto)
    @ValidateNested()
    @IsNotEmpty()
    dataSampleDto: DataSampleDto;
  }