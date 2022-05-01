import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OfferEntity } from '../offers/offer.entity';
import { UserEntity } from '../users/users.entity';

@Entity()
export class StatsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  viewedAt: Date;

  @Column({ nullable: false, default: 'view' })
  type: 'view' | 'question';

  @ManyToOne(() => UserEntity, (user) => user.stats, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  author: UserEntity['id'];

  @Column({ nullable: true })
  authorId: number;

  @ManyToOne(() => OfferEntity, (offer) => offer.stats, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  offer: OfferEntity['id'];

  @Column({ nullable: true })
  offerId: number;
}
