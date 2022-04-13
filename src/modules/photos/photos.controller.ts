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
  Req,
  Res,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PhotosService } from './photos.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PhotoRequest, saveImageToStorage } from 'src/helpers/image-storage';
import { PhotoCreateDto, PhotoPrimaryDto, PhotoUpdateDto } from './photos.dto';
import { Response } from 'express';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Post('/upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image', saveImageToStorage))
  uploadPhoto(
    @Req() request: PhotoRequest,
    @UploadedFile() file: Express.Multer.File,
    @Body() photoCreateDetails: PhotoCreateDto,
  ) {
    return this.photosService.create(
      file,
      photoCreateDetails.offerId,
      request.fileValidationError,
    );
  }

  @Put('/update')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image', saveImageToStorage))
  async editPhoto(
    @Req() request: PhotoRequest,
    @UploadedFile() file: Express.Multer.File,
    @Body() photoUpdateDetails: PhotoUpdateDto,
  ) {
    return await this.photosService.update(
      file,
      photoUpdateDetails.photoId,
      request.fileValidationError,
    );
  }

  @Get('/get-source/:id')
  @UseGuards(JwtAuthGuard)
  async getSourcePhoto(@Res() response: Response, @Param('id') id: string) {
    const photoLink: string = await this.photosService.findImage(parseInt(id));
    return response.sendFile(photoLink);
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
