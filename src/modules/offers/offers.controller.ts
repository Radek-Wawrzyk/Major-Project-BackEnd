import { Body, Controller, Post } from '@nestjs/common';
import { OffersDto } from './offers.dto';
import { OffersService } from './offers.service';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  create(@Body() offer: OffersDto) {
    this.offersService.create(offer);
  }
}
