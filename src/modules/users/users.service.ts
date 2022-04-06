import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthRegister } from '../auth/auth.dto';
import { UserEntity } from './users.entity';
import { UserRegisterDto } from './users.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(user: AuthRegister) {
    const hashedPassword: string = await bcrypt.hash(user.password, 12);
    const newUser = this.usersRepository.create({
      ...user,
      password: hashedPassword,
    });

    return this.usersRepository.save(newUser);
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findOne({
      where: {
        email: email,
      },
    });

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
