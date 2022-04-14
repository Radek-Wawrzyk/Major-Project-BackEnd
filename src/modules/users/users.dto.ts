import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsNumber,
  IsDateString,
} from 'class-validator';

class UpdateUserDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsNumber()
  phone: number;

  avatar_url: string | null;

  bio: string | null;

  @IsDateString()
  created_at: Date;

  @IsDateString()
  updated_at: Date;

  updateTimestamp: any;
}

class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsNumber()
  phone: number;
}

export { UpdateUserDto, CreateUserDto };
