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

  @Column()
  phone: string;

  @ManyToOne((type) => OfferEntity, (offer) => offer.id)
  offer: OfferEntity;

  @ManyToOne((type) => UserEntity, (user) => user.id)
  user: OfferEntity;
}
