import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OfferEntity } from '../offers/offer.entity';
import { UserEntity } from '../users/users.entity';

@Entity()
export class FavoriteOffersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  addedAt: Date;

  @ManyToOne((type) => OfferEntity, (offer) => offer.id)
  offer: OfferEntity;

  @ManyToOne((type) => UserEntity, (user) => user.id)
  user: OfferEntity;
}
