import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OfferEntity } from '../offers/offer.entity';
import { UserEntity } from '../users/users.entity';

@Entity()
export class FavoriteOffersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  added_at: Date;

  @ManyToOne(() => OfferEntity, (offer) => offer.id, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  offer: OfferEntity;

  @Column({ nullable: true })
  offerId: number;

  @ManyToOne(() => UserEntity, (user) => user.id, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  user: OfferEntity;

  @Column({ nullable: true })
  userId: number;
}
