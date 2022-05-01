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
export class QuestionsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  full_name: string;

  @Column()
  question: string;

  @Column()
  email: string;

  @Column()
  phone: string;

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
  user: UserEntity;

  @Column({ nullable: true })
  userId: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;
}
