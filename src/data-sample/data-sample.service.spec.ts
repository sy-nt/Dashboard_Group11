import { Test, TestingModule } from '@nestjs/testing';
import { DataSampleService } from './data-sample.service';

describe('DataSampleService', () => {
  let service: DataSampleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataSampleService],
    }).compile();

    service = module.get<DataSampleService>(DataSampleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
