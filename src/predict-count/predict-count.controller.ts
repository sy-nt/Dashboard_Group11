import { Controller } from '@nestjs/common';
import { PredictCountService } from './predict-count.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('predict-count')
export class PredictCountController {
  constructor(
    private readonly predictCountService: PredictCountService,
  ) {}
}
