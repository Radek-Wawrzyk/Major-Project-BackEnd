import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { LocalAuthGuard } from './auth.local.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  loginUser(@Request() request) {
    return this.authService.login(request.user);
  }

  @Post('/register')
  registerUser(@Request() request) {
    return this.authService.register(request.body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/secure')
  testUser(@Request() request) {
    return request.user;
  }
}
