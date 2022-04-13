import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PhotoEntity } from './photos.entity';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(PhotoEntity)
    private photoRepository: Repository<PhotoEntity>,
  ) {}

  async create(file: Express.Multer.File, offerId: number) {
    if (!offerId) {
      throw new BadRequestException(`You have not send offer_id field`);
    }

    const newFile = this.photoRepository.create({
      url: file.path,
      alt: file.filename,
      is_primary: false,
      offer: offerId,
    });

    return this.photoRepository.save(newFile);
  }

  async update(file: Express.Multer.File, photoId) {
    if (!photoId) {
      throw new BadRequestException(`You have not send photo_id field`);
    }

    const oldPhoto: PhotoEntity = await this.findOne(photoId);
    const photo: PhotoEntity = {
      ...oldPhoto,
      url: file.path,
      alt: file.filename,
    };

    await this.photoRepository.save(photo);

    return {
      photo,
      oldPhoto,
    };
  }

  async findOne(id: number): Promise<PhotoEntity> {
    const photo: PhotoEntity = await this.photoRepository.findOneBy({ id });
    if (!photo) throw new NotFoundException('Photo not found');

    return photo;
  }

  async remove(id: number): Promise<PhotoEntity> {
    const photo: PhotoEntity = await this.findOne(id);
    return this.photoRepository.remove(photo);
  }

  async updatePrimaryPhoto(
    offerId: number,
    photoId: number,
  ): Promise<PhotoEntity> {
    let photo: PhotoEntity = await this.findOne(photoId);

    // Set primary status as false for all entities
    await this.photoRepository
      .createQueryBuilder('photo')
      .update()
      .set({ is_primary: false })
      .where('offer_id = :id', { id: offerId })
      .execute();

    photo = {
      ...photo,
      is_primary: true,
    };

    return await this.photoRepository.save(photo);
  }
}
