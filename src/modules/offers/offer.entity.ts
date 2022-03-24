import {
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PhotoEntity } from '../photos/photos.entity';
import { UserEntity } from '../users/users.entity';

@Entity()
export class OfferEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: '' })
  description: string;

  @Column({ default: false })
  status: boolean;

  @Column()
  price: number;

  @Column()
  location_city: string;

  @Column()
  location_country: string;

  @Column()
  location_district: string;

  @Column({ default: 0 })
  location_latidude: number;

  @Column({ default: 0 })
  location_longitude: number;

  @Column({ default: 0 })
  rooms_number: number;

  @Column({ default: '' })
  building_type: string;

  @Column({ default: 1 })
  building_level: number;

  @Column({ default: '' })
  building_age: string;

  @Column({ default: false })
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

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }

  @Column({ type: 'timestamp', nullable: true })
  publishedDate: Date;

  @OneToMany(() => PhotoEntity, (photo) => photo.offer)
  photos: PhotoEntity[];

  @ManyToOne(() => UserEntity, (user) => user.offers)
  author: UserEntity;
}
