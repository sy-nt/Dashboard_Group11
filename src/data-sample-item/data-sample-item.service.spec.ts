import { Test, TestingModule } from '@nestjs/testing';
import { DataSampleItemService } from './data-sample-item.service';

describe('DataSampleItemService', () => {
  let service: DataSampleItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataSampleItemService],
    }).compile();

    service = module.get<DataSampleItemService>(DataSampleItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
