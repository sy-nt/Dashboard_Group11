import { DataSampleItemEntity } from 'src/data-sample-item/data-sample-Item.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({
  name: 'dbs',
})
export class DataSampleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name_data: string;
  @OneToMany(
    () => DataSampleItemEntity,
    (dataSampleItem) => dataSampleItem.dataSample,
    {
      cascade: true,
    },
  )
  dataSampleItemsDto: DataSampleItemEntity[];
}
