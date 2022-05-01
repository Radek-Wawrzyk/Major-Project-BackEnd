import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OffersModule } from '../offers/offers.module';
import { FavoriteOffersController } from './favorite-offers.controller';
import { FavoriteOffersEntity } from './favorite-offers.entity';
import { FavoriteOffersService } from './favorite-offers.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FavoriteOffersEntity]),
    forwardRef(() => OffersModule),
    // OffersModule,
  ],
  controllers: [FavoriteOffersController],
  providers: [FavoriteOffersService],
  exports: [FavoriteOffersService],
})
export class FavoriteOffersModule {}
