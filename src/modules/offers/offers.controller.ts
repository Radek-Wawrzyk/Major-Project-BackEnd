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
  Req,
  Query,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateOfferDto, OfferDto } from './offers.dto';
import { OffersService } from './offers.service';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createOffer(@Body() offer: CreateOfferDto, @Request() request) {
    return this.offersService.create(offer, parseInt(request.user.id));
  }

  @Get('/:id')
  async getOffer(@Param('id') id: string) {
    return await this.offersService.findOne(parseInt(id));
  }

  @Get('/')
  async getAllOffers(@Query() query) {
    console.log(query);
    return await this.offersService.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteOffer(@Param('id') id: string, @Request() request) {
    return await this.offersService.delete(
      parseInt(id),
      parseInt(request.user.id),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async updateOffer(
    @Param('id') id: string,
    @Request() request,
    @Body() offer: OfferDto,
  ) {
    return await this.offersService.update(
      parseInt(id),
      parseInt(request.user.id),
      offer,
    );
  }
}
