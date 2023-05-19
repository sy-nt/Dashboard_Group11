import { Test, TestingModule } from '@nestjs/testing';
import { DataSampleController } from './data-sample.controller';

describe('DataSampleController', () => {
  let controller: DataSampleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataSampleController],
    }).compile();

    controller = module.get<DataSampleController>(DataSampleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
