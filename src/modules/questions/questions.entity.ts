import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @Column({ type: 'bigint' })
  phone: number;

  @ManyToOne(() => OfferEntity, (offer) => offer.id)
  offer: OfferEntity;

  @Column({ nullable: true })
  offerId: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  user: UserEntity;

  @Column({ nullable: true })
  userId: number;
}
