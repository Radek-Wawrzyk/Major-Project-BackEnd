import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppRequest } from 'src/types/request';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FavoriteOffersService } from './favorite-offers.service';

@Controller('favorite-offers')
export class FavoriteOffersController {
  constructor(private readonly favoriteOffersService: FavoriteOffersService) {}

  @Get('/get')
  @UseGuards(JwtAuthGuard)
  async getAllFavoriteOffers(@Request() request: AppRequest) {
    return await this.favoriteOffersService.findAll(parseInt(request.user.id));
  }

  @Get('/get/:id')
  @UseGuards(JwtAuthGuard)
  async getOneFavoriteOffer(
    @Request() request: AppRequest,
    @Param('id') id: string,
  ) {
    return await this.favoriteOffersService.findOne(
      parseInt(request.user.id),
      parseInt(id),
    );
  }

  @Delete('/remove/:id')
  @UseGuards(JwtAuthGuard)
  async removeOneFavoriteOffer(
    @Request() request: AppRequest,
    @Param('id') id: string,
  ) {
    return await this.favoriteOffersService.remove(
      parseInt(request.user.id),
      parseInt(id),
    );
  }

  @Post('/create/:id')
  @UseGuards(JwtAuthGuard)
  async addOneFavoriteOffer(
    @Request() request: AppRequest,
    @Param('id') id: string,
  ) {
    return await this.favoriteOffersService.create(
      parseInt(request.user.id),
      parseInt(id),
    );
  }
}
