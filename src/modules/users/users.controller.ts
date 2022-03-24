import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserRegisterDto } from './users.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() user: UserRegisterDto) {
    return this.usersService.create(user);
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));
    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const user = await this.usersService.remove(parseInt(id));
    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  @Put('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() currentUser: UserRegisterDto,
  ) {
    const user = await this.usersService.update(parseInt(id), currentUser);
    if (!user) throw new NotFoundException('User not found');

    return user;
  }
}
