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

export type T_Analysis = {
  name:string;
  data:number
}
export class DataSampleItemAnalysisDto{
  status:T_Analysis[];
  predict: Map<string, number>;
}
