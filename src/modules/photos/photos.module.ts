import { Module } from '@nestjs/common';
import { PhotoEntity } from './photos.entity';

@Module({
  imports: [PhotoEntity],
})
export class PhotosModule {}
