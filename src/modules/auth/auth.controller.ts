import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AppRequest } from 'src/types/request';
import {
  AuthForgotPasswordDto,
  AuthRegisterDto,
  AuthResetPasswordDto,
} from './auth.dto';
import { LocalAuthGuard } from './auth.local.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  loginUser(@Request() request: AppRequest) {
    return this.authService.login(request.user);
  }

  @Post('/register')
  registerUser(@Body() registerDetails: AuthRegisterDto) {
    return this.authService.register(registerDetails);
  }

  @Post('/forgot-password')
  sendForgotPassword(@Body() forgotPasswordDetails: AuthForgotPasswordDto) {
    return this.authService.createForgotPasswordLink(forgotPasswordDetails);
  }

  @Post('/reset-password')
  resetPassword(@Body() resetPasswordDetails: AuthResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDetails);
  }
}
