import { IsNotEmpty } from 'class-validator';

class PhotoPrimaryDto {
  @IsNotEmpty()
  offerId: number;

  @IsNotEmpty()
  photoId: number;
}

class PhotoUpdateDto {
  @IsNotEmpty()
  photoId: number;
}

class PhotoCreateDto {
  @IsNotEmpty()
  offerId: number;
}

export { PhotoPrimaryDto, PhotoUpdateDto, PhotoCreateDto };
