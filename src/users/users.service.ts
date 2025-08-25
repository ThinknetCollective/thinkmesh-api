import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class UsersService {
constructor(
@InjectRepository(User) private readonly repo: Repository<User>,
private readonly cfg: ConfigService,
) {}


async create(dto: CreateUserDto): Promise<User> {
const existing = await this.repo.findOne({ where: [{ email: dto.email }, { username: dto.username }] });
if (existing) throw new ConflictException('Email or username already in use');


const saltRounds = parseInt(this.cfg.get('BCRYPT_SALT_ROUNDS') || '12', 10);
const passwordHash = await bcrypt.hash(dto.password, saltRounds);


const user = this.repo.create({
username: dto.username,
email: dto.email,
passwordHash,
bio: dto.bio ?? null,
});
return this.repo.save(user);
}


async findByEmail(email: string): Promise<User | null> {
return this.repo.findOne({ where: { email } });
}


async findById(id: string): Promise<User> {
const user = await this.repo.findOne({ where: { id } });
if (!user) throw new NotFoundException('User not found');
return user;
}
}