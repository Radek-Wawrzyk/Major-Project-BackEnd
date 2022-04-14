import { IsNotEmpty, IsEmail, IsString, IsNumber } from 'class-validator';

class CreateQuestionDto {
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @IsNotEmpty()
  @IsString()
  question: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  phone: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  offerId: number;
}

export { CreateQuestionDto };
