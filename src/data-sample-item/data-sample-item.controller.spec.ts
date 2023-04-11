import { Test, TestingModule } from '@nestjs/testing';
import { DataSampleItemController } from './data-sample-item.controller';

describe('DataSampleItemController', () => {
  let controller: DataSampleItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataSampleItemController],
    }).compile();

    controller = module.get<DataSampleItemController>(DataSampleItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
