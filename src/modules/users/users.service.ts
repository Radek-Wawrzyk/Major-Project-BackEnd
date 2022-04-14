import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './users.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(user: CreateUserDto): Promise<UserEntity> {
    const hashedPassword: string = await bcrypt.hash(user.password, 12);
    const newUser: UserEntity = this.usersRepository.create({
      ...user,
      password: hashedPassword,
    });

    return this.usersRepository.save(newUser);
  }

  async findOne(id: number): Promise<UserEntity> {
    const user: UserEntity = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user: UserEntity = await this.usersRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async remove(userId: number): Promise<UserEntity> {
    const user: UserEntity = await this.findOne(userId);
    return this.usersRepository.remove(user);
  }

  async update(userId: number, newUser: UpdateUserDto): Promise<UserEntity> {
    let user: UserEntity = await this.findOne(userId);

    // If password is changed - generate new hash
    if (user.password !== newUser.password) {
      const hashedPassword: string = await bcrypt.hash(newUser.password, 12);
      newUser = { ...newUser, password: hashedPassword };
    }

    user = { ...user, ...newUser };
    return this.usersRepository.save(user);
  }
}
