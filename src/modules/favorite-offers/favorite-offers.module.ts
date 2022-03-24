import { Module } from '@nestjs/common';
import { FavoriteOffersEntity } from './favorite-offers.entity';

@Module({
  imports: [FavoriteOffersEntity],
})
export class FavoriteOffersModule {}
