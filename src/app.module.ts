import { DataSampleItemEntity } from './data-sample-item/data-sample-Item.entity';
import { DataSampleEntity } from './data-sample/data-sample.entity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataSampleModule } from './data-sample/data-sample.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSampleItemModule } from './data-sample-item/data-sample-item.module';
@Module({
  imports: [
    DataSampleModule,
    DataSampleItemModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 8432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [DataSampleEntity, DataSampleItemEntity],
      synchronize: true,
    }),

    DataSampleModule,
    DataSampleItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
