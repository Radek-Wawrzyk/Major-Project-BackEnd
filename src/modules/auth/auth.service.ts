import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthRegister, AuthTokenPayload } from './auth.dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: UserEntity): Promise<AuthTokenPayload> {
    return {
      access_token: this.jwtService.sign(user),
    };
  }

  async register(userData: AuthRegister): Promise<UserEntity> {
    return await this.usersService.create(userData);
  }
}
