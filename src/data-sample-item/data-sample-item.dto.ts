import { Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty } from 'class-validator';

export enum E_status {
  'ok' = 'ok',
  'fail' = 'fail',
}
export class DataSampleItemDto {
  @Expose()
  name?: string;
  @Expose()
  @IsNotEmpty()
  date: Date | string;
  @Expose()
  @IsNotEmpty()
  angle_id: number;
  @Expose()
  @IsNotEmpty()
  @IsEnum(E_status)
  status;
  @Expose()
  @IsNotEmpty()
  predict_result: number[];
}

export class DataSampleItemAnalysisDto{
  name:string;
  data:string|number;
}
