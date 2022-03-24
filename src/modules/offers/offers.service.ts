import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OfferEntity } from './offer.entity';
import { OffersDto } from './offers.dto';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(OfferEntity)
    private offerRepository: Repository<OfferEntity>,
  ) {}

  findAll(): any {
    return 1;
  }

  findOne(): any {
    return 1;
  }

  remove(): any {
    return 1;
  }

  update(): any {
    return 1;
  }

  create(offer: OffersDto): any {
    const newOffer = this.offerRepository.create(offer);
    return this.offerRepository.save(newOffer);
  }
}
