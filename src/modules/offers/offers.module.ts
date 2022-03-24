import { Module } from '@nestjs/common';
import { OffersController } from './offers.controller';
import { OffersService } from './offers.service';
import { OfferEntity } from './offer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { PhotosModule } from '../photos/photos.module';

@Module({
  imports: [TypeOrmModule.forFeature([OfferEntity]), UsersModule, PhotosModule],
  controllers: [OffersController],
  providers: [OffersService],
})
export class OffersModule {}
