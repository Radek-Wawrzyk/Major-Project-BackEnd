import {
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationResponse } from 'src/types/response';
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

  async findAll(userId: number, params: any): Promise<PaginationResponse> {
    const pagination = {
      page: parseInt(params.page) || 1,
      limit: parseInt(params.limit) || 8,
    };

    const skippedItems: number = (pagination.page - 1) * pagination.limit;

    const [favoriteOffers, totalCount] =
      await this.favoriteOffersRepository.findAndCount({
        where: {
          userId: userId,
        },
        relations: ['offer', 'offer.photos'],
        skip: skippedItems,
        take: pagination.limit,
      });

    const totalPages: number = Math.ceil(totalCount / pagination.limit);

    return {
      totalCount: !favoriteOffers.length ? 0 : totalCount,
      totalPages: totalPages,
      limit: pagination.limit,
      page: pagination.page,
      data: favoriteOffers,
    };
  }

  lol() {
    console.log('l0l')
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
