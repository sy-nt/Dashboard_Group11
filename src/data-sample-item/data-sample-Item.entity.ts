import { DataSampleEntity } from './../data-sample/data-sample.entity';
import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { E_status } from './data-sample-item.dto';
import { PredictCountEntity } from '@/predict-count/predict-count.entity';
@Entity({
  name: 'dbs_item',
})
export class DataSampleItemEntity {
  @PrimaryGeneratedColumn()
  id: string;
  @Column({
    type: 'timestamp with time zone',
  })
  date: Date;
  @Column()
  name: string;
  @Column()
  angle_id: number;
  @Column({
    type: 'enum',
    enum: E_status,
  })
  status: 'ok';
  @Column({
    type: 'float8',
    array: true,
  })
  predict_result: number[];
  @ManyToOne(
    () => DataSampleEntity,
    (dataSample) => dataSample.dataSampleItemsDto,
  )
  dataSample: DataSampleEntity;
}


