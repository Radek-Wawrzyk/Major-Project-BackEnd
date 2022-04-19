import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';
import { OfferEntity } from './offer.entity';

class CreateOfferDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsBoolean()
  @IsNotEmpty()
  status: boolean;

  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  location_city: string;

  @IsNotEmpty()
  @IsString()
  location_country: string;

  @IsNotEmpty()
  @IsString()
  location_district: string;

  @IsNumber()
  location_latidude: number;

  @IsNumber()
  location_longitude: number;

  @IsNumber()
  rooms_number: number;

  @IsString()
  building_type: string;

  @IsNumber()
  building_level: number;

  @IsString()
  building_age: string;

  @IsNumber()
  living_area: number;

  @IsBoolean()
  includes_internet: boolean;

  @IsBoolean()
  includes_house_phone: boolean;

  @IsBoolean()
  includes_tv: boolean;

  @IsBoolean()
  includes_air_conditioning: boolean;

  @IsBoolean()
  includes_basement: boolean;

  @IsBoolean()
  includes_garden: boolean;

  @IsBoolean()
  includes_garage: boolean;

  @IsBoolean()
  includes_parking_space: boolean;

  @IsBoolean()
  includes_lift: boolean;

  @IsBoolean()
  includes_balcony: boolean;

  @IsBoolean()
  includes_washing_machine: boolean;

  @IsBoolean()
  includes_smoke_detectors: boolean;

  @IsBoolean()
  rule_no_smokers: boolean;

  @IsBoolean()
  rule_no_animals: boolean;
}

class OffersPaginationDto {
  page: number;
  limit: number;
}

class OffersSortingDto {
  field: string;
  order: 'ASC' | 'DESC';
}

class OffersResponseDto {
  totalCount: number;
  totalPages: number;
  limit: number;
  page: number;
  data: OfferEntity[];
}

export {
  CreateOfferDto,
  OffersResponseDto,
  OffersPaginationDto,
  OffersSortingDto,
};
