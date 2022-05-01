import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FavoriteOffersEntity } from '../favorite-offers/favorite-offers.entity';
import { OfferEntity } from '../offers/offer.entity';
import { StatsEntity } from '../stats/stats.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  phone: string;

  @Column({ nullable: true })
  avatar_url: string;

  @Column({ default: '' })
  bio: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;

  @OneToMany(() => OfferEntity, (offer) => offer.author)
  offers: OfferEntity[];

  @OneToMany(() => StatsEntity, (stats) => stats.author)
  stats: StatsEntity[];

  @OneToMany(() => FavoriteOffersEntity, (favOffer) => favOffer.user)
  favOffers: FavoriteOffersEntity[];
}
