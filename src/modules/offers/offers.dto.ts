class OffersDto {
  id: number;
  name: string;
  slug: string;
  description: string;
  status: boolean;
  price: number;
  location_city: string;
  location_country: string;
  location_district: string;
  location_latidude: number;
  location_longitude: number;
  rooms_number: number;
  building_type: string;
  building_level: number;
  building_age: string;
  living_area: number;
  includes_internet: boolean;
  includes_house_phone: boolean;
  includes_tv: boolean;
  includes_air_conditioning: boolean;
  includes_basement: boolean;
  includes_garden: boolean;
  includes_garage: boolean;
  includes_parking_space: boolean;
  includes_lift: boolean;
  includes_balcony: boolean;
  includes_washing_machine: boolean;
  includes_smoke_detectors: boolean;
  rule_no_smokers: boolean;
  rule_no_animals: boolean;
  creaded: Date;
  updated: Date | null;
  publishedDate: Date;
}

export { OffersDto };
