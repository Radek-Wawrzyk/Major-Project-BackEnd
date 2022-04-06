import { IsEmail, IsString, Min } from 'class-validator';

class AuthLogin {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @Min(1)
  password: string;
}

interface AuthRegister {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: number;
}

interface AuthTokenPayload {
  access_token: string;
}

export { AuthLogin, AuthRegister, AuthTokenPayload };
