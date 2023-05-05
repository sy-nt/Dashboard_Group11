import { DataSampleItemService } from './data-sample-item.service';
import {
  BadRequestException,
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { DataSampleItemAnalysisDto } from './data-sample-item.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt.guard';

@Controller('data-sample-item')
export class DataSampleItemController {
  constructor(private readonly dataSampleItemService: DataSampleItemService) {}
  @UseGuards(JwtAuthGuard)
  @Get('analytics')
  async getDataAnalytics(): Promise<DataSampleItemAnalysisDto[]> {
    try {
      return await this.dataSampleItemService.getDataAnalytics();
    } catch (err) {
      console.error(err);
      throw new BadRequestException(err);
    }
  }
}
