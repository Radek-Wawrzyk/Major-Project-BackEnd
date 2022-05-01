import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PhotoEntity } from '../photos/photos.entity';
import { StatsEntity } from '../stats/stats.entity';
import { UserEntity } from '../users/users.entity';

@Entity()
export class OfferEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ type: 'longtext', nullable: false })
  description: string;

  @Column({ default: false })
  status: boolean;

  @Column({ default: 0 })
  price: number;

  @Column({ default: 0 })
  deposit: number;

  @Column({ nullable: false })
  location_city: string;

  @Column({ nullable: false })
  location_country: string;

  @Column({ nullable: false })
  location_street: string;

  @Column({ nullable: false })
  location_post_code: string;

  @Column({ default: 0 })
  rooms_number: number;

  @Column({ default: '' })
  building_type: string;

  @Column({ default: 1 })
  building_level: number;

  @Column({ default: '' })
  building_age: string;

  @Column({ default: 0 })
  living_area: number;

  @Column({ default: false })
  includes_internet: boolean;

  @Column({ default: false })
  includes_house_phone: boolean;

  @Column({ default: false })
  includes_tv: boolean;

  @Column({ default: false })
  includes_air_conditioning: boolean;

  @Column({ default: false })
  includes_basement: boolean;

  @Column({ default: false })
  includes_garden: boolean;

  @Column({ default: false })
  includes_garage: boolean;

  @Column({ default: false })
  includes_parking_space: boolean;

  @Column({ default: false })
  includes_lift: boolean;

  @Column({ default: false })
  includes_balcony: boolean;

  @Column({ default: false })
  includes_washing_machine: boolean;

  @Column({ default: false })
  includes_smoke_detectors: boolean;

  @Column({ default: false })
  rule_no_smokers: boolean;

  @Column({ default: false })
  rule_no_animals: boolean;

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

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    nullable: true,
  })
  published_date: Date;

  @OneToMany(() => PhotoEntity, (photo) => photo.offer)
  photos: PhotoEntity[];

  @ManyToOne(() => UserEntity, (user) => user.offers, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  author: UserEntity['id'];

  @Column({ nullable: true })
  authorId: number;

  @OneToMany(() => StatsEntity, (stats) => stats.offer)
  stats: StatsEntity[];
}
