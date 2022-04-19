import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { OfferEntity } from './offer.entity';
import {
  CreateOfferDto,
  OffersPaginationDto,
  OffersSortingDto,
  OffersResponseDto,
} from './offers.dto';
import { OFFERS_HTTP_RESPONSES } from './offers.enum';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(OfferEntity)
    private offerRepository: Repository<OfferEntity>,
  ) {}

  async findAll(params: any): Promise<OffersResponseDto> {
    let databaseQuery: SelectQueryBuilder<OfferEntity> =
      this.offerRepository.createQueryBuilder('offers');

    if (params.userId) {
      databaseQuery = databaseQuery.andWhere('offers.author_id = :userId', {
        userId: params.userId,
      });
    }

    if (params.search) {
      databaseQuery = databaseQuery.andWhere('offers.name like :search', {
        search: `%${params.search}%`,
      });
    }

    if (params.price_min && !params.price_max) {
      databaseQuery = databaseQuery.andWhere('offers.price >= :min', {
        min: params.price_min,
      });
    }

    if (params.price_max && !params.price_min) {
      databaseQuery = databaseQuery.andWhere('offers.price <= :max', {
        max: params.price_max,
      });
    }

    if (params.price_max && params.price_min) {
      databaseQuery = databaseQuery.andWhere(
        'offers.price BETWEEN :min AND :max',
        {
          max: params.price_max,
          min: params.price_min,
        },
      );
    }

    if (params.living_area_min && !params.living_area_max) {
      databaseQuery = databaseQuery.andWhere('offers.living_area >= :min', {
        min: params.living_area_min,
      });
    }

    if (params.living_area_max && !params.living_area_min) {
      databaseQuery = databaseQuery.andWhere('offers.living_area <= :max', {
        max: params.living_area_max,
      });
    }

    if (params.living_area_max && params.living_area_min) {
      databaseQuery = databaseQuery.where(
        'offers.living_area BETWEEN :min AND :max',
        {
          max: params.living_area_max,
          min: params.living_area_min,
        },
      );
    }

    if (params.building_type) {
      databaseQuery = databaseQuery.andWhere('offers.building_type = :type', {
        type: params.building_type,
      });
    }

    if (params.building_age) {
      databaseQuery = databaseQuery.andWhere('offers.building_age = :age', {
        age: params.building_age,
      });
    }

    if (params.building_level) {
      databaseQuery = databaseQuery.andWhere('offers.building_level = :level', {
        level: params.building_level,
      });
    }

    if (params.rooms_number) {
      databaseQuery = databaseQuery.andWhere('offers.rooms_number >= :rooms', {
        rooms: params.rooms_number,
      });
    }

    if (params.location_city) {
      databaseQuery = databaseQuery.andWhere('offers.location_city = :city', {
        city: params.location_city,
      });
    }

    if (params.location_country) {
      databaseQuery = databaseQuery.andWhere(
        'offers.location_country = :country',
        {
          country: params.location_country,
        },
      );
    }

    if (params.includes_internet) {
      databaseQuery = databaseQuery.andWhere(
        'offers.includes_internet = :internet',
        {
          internet: params.includes_internet === 'true',
        },
      );
    }

    if (params.includes_house_phone) {
      databaseQuery = databaseQuery.andWhere(
        'offers.includes_house_phone = :phone',
        {
          phone: params.includes_house_phone === 'true',
        },
      );
    }

    if (params.includes_tv) {
      databaseQuery = databaseQuery.andWhere('offers.includes_tv = :tv', {
        tv: params.includes_tv === 'true',
      });
    }

    if (params.includes_air_conditioning) {
      databaseQuery = databaseQuery.andWhere(
        'offers.includes_air_conditioning = :air_conditioning',
        {
          air_conditioning: params.includes_air_conditioning === 'true',
        },
      );
    }

    if (params.includes_basement) {
      databaseQuery = databaseQuery.andWhere(
        'offers.includes_basement = :basement',
        {
          basement: params.includes_basement === 'true',
        },
      );
    }

    if (params.includes_garden) {
      databaseQuery = databaseQuery.andWhere(
        'offers.includes_garden = :garden',
        {
          garden: params.includes_garden === 'true',
        },
      );
    }

    if (params.includes_garage) {
      databaseQuery = databaseQuery.andWhere(
        'offers.includes_garage = :garage',
        {
          garage: params.includes_garage === 'true',
        },
      );
    }

    if (params.includes_parking_space) {
      databaseQuery = databaseQuery.andWhere(
        'offers.includes_parking_space = :parking_space',
        {
          parking_space: params.includes_parking_space === 'true',
        },
      );
    }

    if (params.includes_lift) {
      databaseQuery = databaseQuery.andWhere('offers.includes_lift = :lift', {
        lift: params.includes_lift === 'true',
      });
    }

    if (params.includes_balcony) {
      databaseQuery = databaseQuery.andWhere(
        'offers.includes_balcony = :balcony',
        {
          balcony: params.includes_balcony === 'true',
        },
      );
    }

    if (params.includes_washing_machine) {
      databaseQuery = databaseQuery.andWhere(
        'offers.includes_washing_machine = :washing_machine',
        {
          washing_machine: params.includes_washing_machine === 'true',
        },
      );
    }

    if (params.includes_smoke_detectors) {
      databaseQuery = databaseQuery.andWhere(
        'offers.includes_smoke_detectors = :smoke_detectors',
        {
          smoke_detectors: params.includes_smoke_detectors === 'true',
        },
      );
    }

    if (params.rule_no_animals) {
      databaseQuery = databaseQuery.andWhere(
        'offers.rule_no_animals = :no_animals',
        {
          no_animals: params.rule_no_animals === 'true',
        },
      );
    }

    if (params.rule_no_smokers) {
      databaseQuery = databaseQuery.andWhere(
        'offers.rule_no_smokers = :no_smokers',
        {
          no_smokers: params.rule_no_smokers === 'true',
        },
      );
    }

    // Pagination & sorting part
    const pagination: OffersPaginationDto = {
      page: parseInt(params.page) || 1,
      limit: parseInt(params.limit) || 10,
    };
    const sorting: OffersSortingDto = {
      field: params.sortingField || 'created_at',
      order: params.sortingOrder || 'ASC',
    };
    const skippedItems: number = (pagination.page - 1) * pagination.limit;

    const [offers, totalCount] = await databaseQuery
      .offset(skippedItems)
      .limit(pagination.limit)
      .orderBy(`${sorting.field}`, sorting.order === 'ASC' ? 'ASC' : 'DESC')
      .getManyAndCount();

    const totalPages: number = Math.ceil(totalCount / pagination.limit);

    return {
      totalCount: totalCount,
      totalPages: totalPages,
      limit: pagination.limit,
      page: pagination.page,
      data: offers,
    };
  }

  async findOne(id: number): Promise<OfferEntity> {
    const offer: OfferEntity = await this.offerRepository.findOneBy({ id });
    if (!offer) throw new NotFoundException(OFFERS_HTTP_RESPONSES.NOT_FOUND);

    return offer;
  }

  async findWithDetails(offerId: number): Promise<OfferEntity> {
    const offerWithAllDetails: OfferEntity = await this.offerRepository.findOne(
      {
        where: {
          id: offerId,
        },
        relations: {
          author: true,
          photos: true,
        },
      },
    );

    if (!offerWithAllDetails) {
      throw new NotFoundException(OFFERS_HTTP_RESPONSES.NOT_FOUND);
    }

    return offerWithAllDetails;
  }

  async delete(offerId: number, userId: number): Promise<OfferEntity> {
    const offer: OfferEntity = await this.findOne(offerId);

    if (offer.authorId !== userId) {
      throw new ForbiddenException(OFFERS_HTTP_RESPONSES.FORBIDDEN);
    }

    return this.offerRepository.remove(offer);
  }

  async update(
    offerId: number,
    userId: number,
    newOffer: CreateOfferDto,
  ): Promise<OfferEntity> {
    let offer: OfferEntity = await this.findOne(offerId);

    if (!offer) {
      throw new NotFoundException(OFFERS_HTTP_RESPONSES.NOT_FOUND);
    }

    if (userId !== offer.authorId) {
      throw new ForbiddenException(OFFERS_HTTP_RESPONSES.FORBIDDEN);
    }

    offer = {
      ...offer,
      ...newOffer,
      published_date: newOffer.status ? new Date() : null,
    };

    return await this.offerRepository.save(offer);
  }

  create(offer: CreateOfferDto, userId: number): Promise<OfferEntity> {
    const newOffer: OfferEntity = this.offerRepository.create({
      ...offer,
      author: userId,
      published_date: offer.status ? new Date() : null,
    });

    return this.offerRepository.save(newOffer);
  }
}
