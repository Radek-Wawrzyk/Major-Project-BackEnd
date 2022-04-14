import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './users.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { join } from 'path';
import { removeFile } from 'src/helpers/image-storage';

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

  async findWithOffers(userId: number): Promise<UserEntity> {
    const userWithOffers: UserEntity = await this.usersRepository.findOne({
      where: {
        id: userId,
      },
      relations: {
        offers: true,
      },
    });

    if (!userWithOffers) {
      throw new NotFoundException('User not found');
    }

    return userWithOffers;
  }

  async createAvatar(
    file: Express.Multer.File,
    userId: number,
    fileValidationError?: string,
  ): Promise<UserEntity> {
    if (!file || fileValidationError) {
      throw new BadRequestException('invalid file provided');
    }

    let user: UserEntity = await this.findOne(userId);
    user = {
      ...user,
      avatar_url: file.path,
    };

    return this.usersRepository.save(user);
  }

  async editAvatar(
    file: Express.Multer.File,
    userId: number,
    fileValidationError?: string,
  ): Promise<UserEntity> {
    if (!file || fileValidationError) {
      throw new BadRequestException('invalid file provided');
    }

    let user: UserEntity = await this.findOne(userId);

    // Remove old photo
    const imagesFolderPath: string = join(process.cwd(), '');
    const fullImagePath: string = join(
      `${imagesFolderPath}/${user.avatar_url}`,
    );

    if (imagesFolderPath && fullImagePath) {
      removeFile(fullImagePath);
    }

    user = {
      ...user,
      avatar_url: file.path,
    };

    return this.usersRepository.save(user);
  }

  async removeAvatar(userId: number) {
    let user: UserEntity = await this.findOne(userId);

    // Remove old photo
    const imagesFolderPath: string = join(process.cwd(), '');
    const fullImagePath: string = join(
      `${imagesFolderPath}/${user.avatar_url}`,
    );

    if (imagesFolderPath && fullImagePath) {
      removeFile(fullImagePath);
    }

    user = {
      ...user,
      avatar_url: null,
    };

    return this.usersRepository.save(user);
  }
}
