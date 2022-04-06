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

class AuthTokenedUser {
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

export { AuthLogin, AuthRegister, AuthTokenPayload, AuthTokenedUser };
