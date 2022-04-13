import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PhotoEntity } from './photos.entity';
import { join } from 'path';
import { removeFile } from 'src/helpers/image-storage';
import { app } from 'src/main';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(PhotoEntity)
    private photoRepository: Repository<PhotoEntity>,
  ) {}

  async create(
    file: Express.Multer.File,
    offerId: number,
    fileValidationError?: string,
  ) {
    if (!offerId) {
      throw new BadRequestException(`You have not send offer_id field`);
    }

    if (!file || fileValidationError) {
      throw new BadRequestException('invalid file provided');
    }

    const newFile = this.photoRepository.create({
      url: file.path,
      alt: file.filename,
      is_primary: false,
      offer: offerId,
    });

    return this.photoRepository.save(newFile);
  }

  async update(
    file: Express.Multer.File,
    photoId: number,
    fileValidationError?: string,
  ) {
    if (!photoId) {
      throw new BadRequestException(`You have not send photo_id field`);
    }

    if (!file || fileValidationError) {
      throw new BadRequestException('invalid file provided');
    }

    const oldPhoto: PhotoEntity = await this.findOne(photoId);

    if (oldPhoto) {
      const imagesFolderPath: string = join(process.cwd(), '');
      const fullImagePath: string = join(`${imagesFolderPath}/${oldPhoto.url}`);

      removeFile(fullImagePath);
    }

    const photo: PhotoEntity = {
      ...oldPhoto,
      url: file.path,
      alt: file.filename,
    };

    return await this.photoRepository.save(photo);
  }

  async findOne(id: number): Promise<PhotoEntity> {
    const photo: PhotoEntity = await this.photoRepository.findOneBy({ id });
    if (!photo) throw new NotFoundException('Photo not found');

    return photo;
  }

  async remove(id: number): Promise<boolean> {
    const photo: PhotoEntity = await this.findOne(id);

    if (photo) {
      const imagesFolderPath: string = join(process.cwd(), '');
      const fullImagePath: string = join(`${imagesFolderPath}/${photo.url}`);

      removeFile(fullImagePath);
    }

    await this.photoRepository.remove(photo);
    return true;
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
      .where('offer = :id', { id: offerId })
      .execute();

    photo = {
      ...photo,
      is_primary: true,
    };

    return await this.photoRepository.save(photo);
  }

  async findLink(photoId: number): Promise<string> {
    const photo: PhotoEntity = await this.findOne(photoId);
    const appURL: string = await app.getUrl();

    return `${appURL}/${photo.url}`;
  }

  async findImage(photoId: number): Promise<string> {
    const photo: PhotoEntity = await this.findOne(photoId);
    return join(process.cwd(), `uploads/photos/${photo.alt}`);
  }
}
