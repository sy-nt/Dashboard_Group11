import { DataSampleEntity } from './../data-sample/data-sample.entity';
import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
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
    enum: ['ok', 'fail'],
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
