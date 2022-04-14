import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OffersModule } from '../offers/offers.module';
import { FavoriteOffersController } from './favorite-offers.controller';
import { FavoriteOffersEntity } from './favorite-offers.entity';
import { FavoriteOffersService } from './favorite-offers.service';

@Module({
  imports: [TypeOrmModule.forFeature([FavoriteOffersEntity]), OffersModule],
  controllers: [FavoriteOffersController],
  providers: [FavoriteOffersService],
})
export class FavoriteOffersModule {}
