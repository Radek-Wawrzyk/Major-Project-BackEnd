import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UpdateUserDto } from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    return await this.usersService.findOne(parseInt(id));
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    return await this.usersService.remove(parseInt(id));
  }

  @Put('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() currentUser: UpdateUserDto,
  ) {
    return await this.usersService.update(parseInt(id), currentUser);
  }
}
