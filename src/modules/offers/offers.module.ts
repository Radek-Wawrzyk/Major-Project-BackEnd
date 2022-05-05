import { forwardRef, Module } from '@nestjs/common';
import { OffersController } from './offers.controller';
import { OffersService } from './offers.service';
import { OfferEntity } from './offer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { PhotosModule } from '../photos/photos.module';
import { StatsModule } from '../stats/stats.module';
import { FavoriteOffersModule } from '../favorite-offers/favorite-offers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OfferEntity]),
    UsersModule,
    PhotosModule,
    StatsModule,
    forwardRef(() => FavoriteOffersModule),
  ],
  controllers: [OffersController],
  providers: [OffersService],
  exports: [OffersService],
})
export class OffersModule {}
