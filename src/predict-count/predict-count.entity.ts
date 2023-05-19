import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'predict_count',
})
export class PredictCountEntity {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  name: string;
  @Column({
    default:0
  })
  data: number;
}
