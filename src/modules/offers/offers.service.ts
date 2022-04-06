import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OfferEntity } from './offer.entity';
import { CreateOfferDto, OfferDto } from './offers.dto';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(OfferEntity)
    private offerRepository: Repository<OfferEntity>,
  ) {}

  async findAll(params: any): Promise<OfferEntity[]> {
    let databaseQuery = this.offerRepository.createQueryBuilder('offers');

    if (params.search) {
      databaseQuery = databaseQuery.andWhere('offers.name like :search', {
        search: params.search,
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

    const offers = await databaseQuery.getMany();
    return offers;
  }

  async findOne(id: number): Promise<OfferEntity> {
    const offer = await this.offerRepository.findOneBy({ id });
    if (!offer) throw new NotFoundException('Offer not found');

    return offer;
  }

  async delete(id: number, userId: number): Promise<OfferEntity> {
    const offer = await this.offerRepository.findOneBy({ id });
    if (!offer) throw new NotFoundException('Offer not found');

    if (offer.author_id !== userId) {
      throw new ForbiddenException('You have no access to this offer');
    }

    return this.offerRepository.remove(offer);
  }

  async update(
    id: number,
    userId: number,
    newOffer: OfferDto,
  ): Promise<OfferDto> {
    let offer = await this.offerRepository.findOneBy({ id });
    if (!offer) throw new NotFoundException('Offer not found');

    if (userId !== offer.author_id) {
      throw new ForbiddenException('You have no access to this offer');
    }

    offer = {
      ...offer,
      ...newOffer,
      published_date: newOffer.status ? new Date() : null,
    };

    return await this.offerRepository.save(offer);
  }

  create(offer: CreateOfferDto, userId: number): Promise<OfferEntity> {
    const newOffer = this.offerRepository.create({
      ...offer,
      author_id: userId,
      published_date: offer.status ? new Date() : null,
    });

    return this.offerRepository.save(newOffer);
  }
}
