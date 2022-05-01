import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsNumber,
  IsDateString,
} from 'class-validator';

class UpdateUserDto {
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
  phone: string;

  @IsString()
  bio: string | null;
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
  @IsString()
  phone: string;
}

class UpdateUserPasswordDto {
  @IsNotEmpty()
  @IsString()
  password: string;
}

export { UpdateUserDto, CreateUserDto, UpdateUserPasswordDto };
