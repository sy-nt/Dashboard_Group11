import { Test, TestingModule } from '@nestjs/testing';
import { PredictCountService } from './predict-count.service';

describe('PredictCountService', () => {
  let service: PredictCountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PredictCountService],
    }).compile();

    service = module.get<PredictCountService>(PredictCountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
