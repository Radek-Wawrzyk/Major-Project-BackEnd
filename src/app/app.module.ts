import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

// Entities
import { OfferEntity } from '../modules/offers/offer.entity';
import { UserEntity } from '../modules/users/users.entity';
import { PhotoEntity } from '../modules/photos/photos.entity';
import { FavoriteOffersEntity } from '../modules/favorite-offers/favorite-offers.entity';
import { QuestionsEntity } from '../modules/questions/questions.entity';

// Modules
import { UsersModule } from '../modules/users/users.module';
import { OffersModule } from '../modules/offers/offers.module';
import { PhotosModule } from '../modules/photos/photos.module';
import { FavoriteOffersModule } from '../modules/favorite-offers/favorite-offers.module';
import { QuestionsModule } from '../modules/questions/questions.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';

// External modules
import { SendGridModule } from '@anchan828/nest-sendgrid';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MulterModule.register({
      dest: '../uploads',
    }),
    SendGridModule.forRoot({
      apikey: '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',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      entities: [
        AuthModule,
        OfferEntity,
        UserEntity,
        PhotoEntity,
        FavoriteOffersEntity,
        QuestionsEntity,
      ],
    }),
    AuthModule,
    OffersModule,
    UsersModule,
    PhotosModule,
    FavoriteOffersModule,
    QuestionsModule,
  ],
})
export class AppModule {}
