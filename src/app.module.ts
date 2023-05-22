import { DataSampleItemEntity } from './data-sample-item/data-sample-Item.entity';
import { DataSampleEntity } from './data-sample/data-sample.entity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataSampleModule } from './data-sample/data-sample.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSampleItemModule } from './data-sample-item/data-sample-item.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UsersEntity } from './users/users.entity';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PredictCountModule } from './predict-count/predict-count.module';
import { PredictCountEntity } from './predict-count/predict-count.entity';
import { configuration } from '../configuration';
import { CorsModule } from '@nestjs/cors';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
       envFilePath: `${process.cwd()}/env/.env.${process.env.NODE_ENV}`,
       load:[configuration],
    }),
    CorsModule.forRoot({
      origin: ['http://44.211.174.149:3000'], // Add your frontend URL here
      credentials: true, // Set this to true if you need to pass cookies or authorization headers
    }),
    DataSampleModule,
    DataSampleItemModule,
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [
          DataSampleEntity,
          DataSampleItemEntity,
          UsersEntity,
          PredictCountEntity,
        ],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    JwtModule,
    PassportModule,
    DataSampleModule,
    DataSampleItemModule,
    AuthModule,
    UsersModule,
    PredictCountModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
