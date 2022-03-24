import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OfferEntity } from '../offers/offer.entity';

@Entity()
export class PhotoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  alt: string;

  @ManyToOne((type) => OfferEntity, (offer) => offer.photos)
  offer: OfferEntity;
}
