import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OffersService } from '../offers/offers.service';
import { FavoriteOffersEntity } from './favorite-offers.entity';
import { FAVORITE_OFFERS_HTTP_RESPONSES } from './favorite-offers.enum';

@Injectable()
export class FavoriteOffersService {
  constructor(
    @InjectRepository(FavoriteOffersEntity)
    private favoriteOffersRepository: Repository<FavoriteOffersEntity>,
    private offersService: OffersService,
  ) {}

  async findAll(userId: number): Promise<FavoriteOffersEntity[]> {
    const favoriteOffers: FavoriteOffersEntity[] =
      await this.favoriteOffersRepository.find({
        where: {
          userId: userId,
        },
        relations: {
          offer: true,
        },
      });

    return favoriteOffers;
  }

  async findOne(
    userId: number,
    offerId: number,
  ): Promise<FavoriteOffersEntity> {
    const favoriteOffer: FavoriteOffersEntity =
      await this.favoriteOffersRepository.findOne({
        where: {
          offerId: offerId,
          userId: userId,
        },
        relations: {
          offer: true,
        },
      });

    if (!favoriteOffer) {
      throw new NotFoundException(FAVORITE_OFFERS_HTTP_RESPONSES.NOT_FOUND);
    }

    return favoriteOffer;
  }

  async create(userId: number, offerId: number): Promise<FavoriteOffersEntity> {
    // If the offer is null, then it would trigger 404 not found response
    await this.offersService.findOne(offerId);

    const favoriteOffer: FavoriteOffersEntity =
      this.favoriteOffersRepository.create({
        userId: userId,
        offerId: offerId,
      });

    return this.favoriteOffersRepository.save(favoriteOffer);
  }

  async remove(
    userId: number,
    favoriteOfferId: number,
  ): Promise<FavoriteOffersEntity> {
    const favoriteOffer: FavoriteOffersEntity =
      await this.favoriteOffersRepository.findOne({
        where: {
          id: favoriteOfferId,
        },
      });

    if (!favoriteOffer) {
      throw new NotFoundException(FAVORITE_OFFERS_HTTP_RESPONSES.NOT_FOUND);
    }

    if (userId !== favoriteOffer.userId) {
      throw new ForbiddenException(FAVORITE_OFFERS_HTTP_RESPONSES.FORBIDDEN);
    }

    return this.favoriteOffersRepository.remove(favoriteOffer);
  }
}
