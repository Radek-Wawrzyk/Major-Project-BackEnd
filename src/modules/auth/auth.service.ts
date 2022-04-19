import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import {
  AuthDecryptedTokenDto,
  AuthForgotPasswordDto,
  AuthRegisterDto,
  AuthResetPasswordDto,
  AuthTokenDto,
  AuthTokenedUserDto,
} from './auth.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserEntity } from '../users/users.entity';
import { SendGridService } from '@anchan828/nest-sendgrid';
import { AUTH_EMAIL_CONFIG, AUTH_HTTP_RESPONSES } from './auth.enum';
import { renderResetPasswordEmailTemplate } from 'src/helpers/mailing-messages';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly sendGrid: SendGridService,
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

  async createForgotPasswordLink(
    forgotPasswordDetails: AuthForgotPasswordDto,
  ): Promise<string> {
    const user: UserEntity = await this.usersService.findByEmail(
      forgotPasswordDetails.email,
    );
    const token: string = jwt.sign(
      { id: user.id },
      process.env.JWT_RESET_SECRET,
      {
        expiresIn: '7d',
      },
    );
    const serverAddress = `${process.env.FRONT_END_URL}/auth/reset-passsword?token=${token}`;

    try {
      await this.sendGrid.send({
        to: forgotPasswordDetails.email,
        from: AUTH_EMAIL_CONFIG.FROM,
        subject: AUTH_EMAIL_CONFIG.SUBJECT,
        text: AUTH_EMAIL_CONFIG.TEXT,
        html: renderResetPasswordEmailTemplate(
          serverAddress,
          user.first_name,
          token,
        ),
      });

      return 'success';
    } catch (err) {
      throw new BadRequestException(err.response.body.errors);
    }
  }

  async resetPassword(
    resetPasswordDetails: AuthResetPasswordDto,
  ): Promise<any> {
    // Checking if token is valid (date)
    let isTokenValid = true;

    try {
      jwt.verify(resetPasswordDetails.token, process.env.JWT_RESET_SECRET);
    } catch (err) {
      isTokenValid = false;
    }

    const decryptedToken: jwt.JwtPayload | string = jwt.decode(
      resetPasswordDetails.token,
    ) as AuthDecryptedTokenDto;

    if (decryptedToken.id && isTokenValid) {
      const status: boolean = await this.usersService.updatePassword(
        resetPasswordDetails.password,
        decryptedToken.id,
      );

      if (status) return AUTH_HTTP_RESPONSES.UPDATED_PASSOWRD;
    }

    return new BadRequestException(AUTH_HTTP_RESPONSES.NOT_UPDATED_PASSOWRD);
  }
}
