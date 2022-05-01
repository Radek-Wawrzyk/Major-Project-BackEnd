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
import { PHOTOS_HTTP_RESPONSES } from './photos.enum';

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
      throw new BadRequestException(PHOTOS_HTTP_RESPONSES.NO_OFFER_ID);
    }

    if (!file || fileValidationError) {
      throw new BadRequestException(PHOTOS_HTTP_RESPONSES.BAD_FILE);
    }

    // Fetch all offer photos for setting is_primary value,
    // when there is no photos, then is_primary field should be set as true
    const offerPhotos: PhotoEntity[] = await this.photoRepository
      .createQueryBuilder('photo')
      .where('photo.offer = :id', { id: offerId })
      .getMany();

    const newFile = this.photoRepository.create({
      url: file.path,
      name: file.filename,
      is_primary: offerPhotos && offerPhotos.length ? false : true,
      offerId: offerId,
    });

    const numberOfPhotos: number = await this.photoRepository.count({
      where: {
        offerId,
      },
    });

    if (numberOfPhotos >= 5) {
      throw new BadRequestException(PHOTOS_HTTP_RESPONSES.OVER_LIMIT);
    }

    return this.photoRepository.save(newFile);
  }

  async update(
    file: Express.Multer.File,
    photoId: number,
    fileValidationError?: string,
  ) {
    if (!photoId) {
      throw new BadRequestException(PHOTOS_HTTP_RESPONSES.NO_PHOTO_ID);
    }

    if (!file || fileValidationError) {
      throw new BadRequestException(PHOTOS_HTTP_RESPONSES.BAD_FILE);
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
      name: file.filename,
    };

    return await this.photoRepository.save(photo);
  }

  async findOne(id: number): Promise<PhotoEntity> {
    const photo: PhotoEntity = await this.photoRepository.findOneBy({ id });
    if (!photo) throw new NotFoundException(PHOTOS_HTTP_RESPONSES.NOT_FOUND);

    return photo;
  }

  async findAll(offerId: number): Promise<PhotoEntity[]> {
    const photos: PhotoEntity[] = await this.photoRepository.find({
      where: {
        offerId,
      },
    });

    if (!photos) throw new NotFoundException(PHOTOS_HTTP_RESPONSES.NOT_FOUND);

    return photos;
  }

  async remove(id: number): Promise<boolean> {
    const photo: PhotoEntity = await this.findOne(id);

    if (photo) {
      const imagesFolderPath: string = join(process.cwd(), '');
      const fullImagePath: string = join(`${imagesFolderPath}/${photo.url}`);

      removeFile(fullImagePath);
    }

    await this.photoRepository.remove(photo);

    const allRelatedPhotos: PhotoEntity[] = await this.findAll(photo.offerId);
    const isAnyPhotoHasPrimaryStatus: boolean = allRelatedPhotos.some(
      (photo: PhotoEntity) => photo.is_primary,
    );

    // If there is no photos with primary status set as true,
    // then set 'is_primary' to the previous or first image from the list
    if (!isAnyPhotoHasPrimaryStatus) {
      const indexToRemove: number = allRelatedPhotos.indexOf(photo);
      const photoToEdit: PhotoEntity =
        indexToRemove > 0
          ? allRelatedPhotos[indexToRemove - 1]
          : allRelatedPhotos[0];

      photoToEdit.is_primary = true;
      this.photoRepository.save(photoToEdit);
    }

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
    return join(process.cwd(), `uploads/photos/${photo.name}`);
  }
}
