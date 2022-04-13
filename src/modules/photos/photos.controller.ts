import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Req,
  Res,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PhotosService } from './photos.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { removeFile, saveImageToStorage } from 'src/helpers/image-storage';
import { join } from 'path';
import { app } from 'src/main';
import { PhotoEntity } from './photos.entity';
import { PhotoPrimaryPayload } from './photos.interface';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Post('/upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image', saveImageToStorage))
  uploadPhoto(
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
    @Body() body,
  ) {
    if (!file || req.fileValidationError) {
      throw new BadRequestException('invalid file provided');
    }

    return this.photosService.create(file, parseInt(body.offer_id));
  }

  @Put('/update')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image', saveImageToStorage))
  async editPhoto(
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
    @Body() body,
  ) {
    if (!file || req.fileValidationError) {
      throw new BadRequestException('invalid file provided');
    }

    const photos = await this.photosService.update(
      file,
      parseInt(body.photo_id),
    );

    const imagesFolderPath: string = join(process.cwd(), '');
    const fullImagePath: string = join(
      `${imagesFolderPath}/${photos.oldPhoto.url}`,
    );

    if (photos.oldPhoto) {
      removeFile(fullImagePath);
    }

    return photos.photo;
  }

  @Get('/get-source/:id')
  @UseGuards(JwtAuthGuard)
  async getSourcePhoto(@Res() res, @Param('id') id: string) {
    const photo = await this.photosService.findOne(parseInt(id));

    return res.sendFile(join(process.cwd(), `uploads/photos/${photo.alt}`));
  }

  @Get('/get-link/:id')
  @UseGuards(JwtAuthGuard)
  async getPhotoLink(@Param('id') id: string) {
    const photo: PhotoEntity = await this.photosService.findOne(parseInt(id));
    const appURL: string = await app.getUrl();

    return `${appURL}/${photo.url}`;
  }

  @Delete('/delete/:id')
  @UseGuards(JwtAuthGuard)
  async removePhoto(@Param('id') id: string) {
    const deletedPhoto: PhotoEntity = await this.photosService.remove(
      parseInt(id),
    );
    const imagesFolderPath: string = join(process.cwd(), '');
    const fullImagePath: string = join(
      `${imagesFolderPath}/${deletedPhoto.url}`,
    );

    if (deletedPhoto) {
      removeFile(fullImagePath);
    }
  }

  @Post('/set-primary')
  @UseGuards(JwtAuthGuard)
  async setPhotoPrimary(@Body() photoDetails: PhotoPrimaryPayload) {
    return await this.photosService.updatePrimaryPhoto(
      photoDetails.offerId,
      photoDetails.photoId,
    );
  }
}
