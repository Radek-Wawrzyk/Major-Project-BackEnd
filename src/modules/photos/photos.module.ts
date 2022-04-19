import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotosController } from './photos.controller';
import { PhotoEntity } from './photos.entity';
import { PhotosService } from './photos.service';

@Module({
  imports: [TypeOrmModule.forFeature([PhotoEntity])],
  controllers: [PhotosController],
  providers: [PhotosService],
})
export class PhotosModule {}
