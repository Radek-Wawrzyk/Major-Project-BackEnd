import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OfferEntity } from '../offers/offer.entity';

@Entity()
export class PhotoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  name: string;

  @Column({ nullable: false, default: false })
  is_primary: boolean;

  @ManyToOne(() => OfferEntity, (offer) => offer.photos)
  offer: OfferEntity['id'];
}
