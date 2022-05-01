import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { AppRequest } from 'src/types/request';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateOfferDto } from './offers.dto';
import { OffersService } from './offers.service';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  createOffer(@Body() offer: CreateOfferDto, @Request() request: AppRequest) {
    return this.offersService.create(offer, parseInt(request.user.id));
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get-user-offers')
  getUserOffers(@Request() request: AppRequest, @Query() query) {
    return this.offersService.findUserOffers(parseInt(request.user.id), query);
  }

  @Get('/get/:id')
  async getOffer(@Param('id') id: string) {
    return await this.offersService.findOne(parseInt(id));
  }

  @Get('/get-with-details/:id')
  async getOfferWithAllDetails(@Param('id') id: string) {
    return await this.offersService.findWithDetails(parseInt(id));
  }

  @Get('/get')
  async getAllOffers(@Query() query) {
    return await this.offersService.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/remove/:id')
  async deleteOffer(@Param('id') id: string, @Request() request: AppRequest) {
    return await this.offersService.delete(
      parseInt(id),
      parseInt(request.user.id),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('/update/:id')
  async updateOffer(
    @Param('id') id: string,
    @Request() request: AppRequest,
    @Body() offer: CreateOfferDto,
  ) {
    return await this.offersService.update(
      parseInt(id),
      parseInt(request.user.id),
      offer,
    );
  }
}
