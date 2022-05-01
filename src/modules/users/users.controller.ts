import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { saveImageToStorage } from 'src/helpers/image-storage';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateUserDto, UpdateUserPasswordDto } from './users.dto';
import { UsersService } from './users.service';
import { AppRequest } from 'src/types/request';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/get')
  @UseGuards(JwtAuthGuard)
  async findUser(@Request() request: AppRequest) {
    return await this.usersService.findOne(parseInt(request.user.id));
  }

  @Get('/get-with-offers/:id')
  async findUserWithAllDetails(@Param('id') id: string) {
    return await this.usersService.findWithOffers(parseInt(id));
  }

  @Delete('/remove')
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Request() request: AppRequest) {
    return await this.usersService.remove(parseInt(request.user.id));
  }

  @Put('/edit')
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Body() currentUser: UpdateUserDto,
    @Request() request: AppRequest,
  ) {
    return await this.usersService.update(
      parseInt(request.user.id),
      currentUser,
    );
  }

  @Post('/change-password')
  @UseGuards(JwtAuthGuard)
  async changeUserPassword(
    @Body() passwordDetails: UpdateUserPasswordDto,
    @Request() request: AppRequest,
  ) {
    return await this.usersService.updatePassword(
      passwordDetails.password,
      parseInt(request.user.id),
    );
  }

  @Post('/upload-avatar')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image', saveImageToStorage('avatars')))
  async uploadUserAvatar(
    @Request() request: AppRequest,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.usersService.createAvatar(
      file,
      parseInt(request.user.id),
      request.fileValidationError,
    );
  }

  @Put('/edit-avatar')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image', saveImageToStorage('avatars')))
  async editUserAvatar(
    @Request() request: AppRequest,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.usersService.editAvatar(
      file,
      parseInt(request.user.id),
      request.fileValidationError,
    );
  }

  @Delete('/remove-avatar')
  @UseGuards(JwtAuthGuard)
  async removeUserAvatar(@Request() request: AppRequest) {
    return await this.usersService.removeAvatar(parseInt(request.user.id));
  }
}
