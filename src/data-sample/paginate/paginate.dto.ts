import { Expose } from 'class-transformer';
import { IsOptional, IsNumber, Min } from 'class-validator';

export class PaginationDto {
  @Expose()
  @IsOptional()
  @IsNumber()
  @Min(1)
  page = 1;
  @Expose()
  @IsOptional()
  @IsNumber()
  @Min(1)
  limit = 10;
}
