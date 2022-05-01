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
  Res,
  Param,
  Request,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PhotosService } from './photos.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { saveImageToStorage } from 'src/helpers/image-storage';
import { PhotoPrimaryDto } from './photos.dto';
import { Response } from 'express';
import { AppRequest } from 'src/types/request';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Post('/upload/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image', saveImageToStorage('photos')))
  uploadPhoto(
    @Request() request: AppRequest,
    @UploadedFile() file: Express.Multer.File,
    @Param('id') offerId: string,
  ) {
    return this.photosService.create(
      file,
      parseInt(offerId),
      request.fileValidationError,
    );
  }

  @Put('/update/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image', saveImageToStorage('photos')))
  async editPhoto(
    @Request() request: AppRequest,
    @UploadedFile() file: Express.Multer.File,
    @Param('id') photoId: string,
  ) {
    return await this.photosService.update(
      file,
      parseInt(photoId),
      request.fileValidationError,
    );
  }

  @Get('/get-source/:id')
  @UseGuards(JwtAuthGuard)
  async getSourcePhoto(@Res() response: Response, @Param('id') id: string) {
    const photoLink: string = await this.photosService.findImage(parseInt(id));
    return response.sendFile(photoLink);
  }

  @Get('/get-all/:id')
  @UseGuards(JwtAuthGuard)
  async getAllPhotos(@Param('id') offerId: string) {
    return await this.photosService.findAll(parseInt(offerId));
  }

  @Get('/get/:id')
  @UseGuards(JwtAuthGuard)
  async getPhoto(@Param('id') id: string) {
    return await this.photosService.findOne(parseInt(id));
  }

  @Get('/get-link/:id')
  @UseGuards(JwtAuthGuard)
  async getPhotoLink(@Param('id') id: string) {
    return await this.photosService.findLink(parseInt(id));
  }

  @Delete('/delete/:id')
  @UseGuards(JwtAuthGuard)
  async removePhoto(@Param('id') id: string) {
    return await this.photosService.remove(parseInt(id));
  }

  @Post('/set-primary')
  @UseGuards(JwtAuthGuard)
  async setPhotoPrimary(@Body() photoDetails: PhotoPrimaryDto) {
    return await this.photosService.updatePrimaryPhoto(
      photoDetails.offerId,
      photoDetails.photoId,
    );
  }
}
