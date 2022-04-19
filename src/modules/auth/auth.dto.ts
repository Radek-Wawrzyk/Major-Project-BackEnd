import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

class AuthLoginDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, {
    message: 'Your password is too weak',
  })
  password: string;
}

class AuthRegisterDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, {
    message: 'Your password is too weak',
  })
  password: string;

  @IsNumber()
  @IsNotEmpty()
  phone: number;
}

class AuthTokenDto {
  access_token: string;
}

class AuthTokenedUserDto {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: number;
  avatar_url: string | null;
  bio: string | null;
  created_at: Date;
  updated_at: Date;
  iat: number;
  exp: number;
}

class AuthForgotPasswordDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

class AuthResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, {
    message: 'Your password is too weak',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  token: string;
}

class AuthDecryptedTokenDto {
  id: number;
  iat: number;
  exp: number;
}

export {
  AuthLoginDto,
  AuthRegisterDto,
  AuthTokenDto,
  AuthTokenedUserDto,
  AuthForgotPasswordDto,
  AuthResetPasswordDto,
  AuthDecryptedTokenDto,
};
