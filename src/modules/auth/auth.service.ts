import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthRegisterDto, AuthTokenDto, AuthTokenedUserDto } from './auth.dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user: UserEntity = await this.usersService.findByEmail(email);

    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...rest } = user;
      return rest;
    }

    return null;
  }

  async login(user: AuthTokenedUserDto): Promise<AuthTokenDto> {
    return {
      access_token: this.jwtService.sign(user),
    };
  }

  async register(userData: AuthRegisterDto): Promise<UserEntity> {
    return await this.usersService.create(userData);
  }
}
