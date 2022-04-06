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

  async findAll(): Promise<OfferEntity[]> {
    const offers = await this.offerRepository.find();
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
