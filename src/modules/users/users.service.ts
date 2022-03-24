import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './users.entity';
import { UserRegisterDto } from './users.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  create(user: UserRegisterDto) {
    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');

    return this.usersRepository.remove(user);
  }

  async update(id: number, currentUser) {
    let user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');

    user = { ...user, ...currentUser };
    return this.usersRepository.save(user);
  }
}
