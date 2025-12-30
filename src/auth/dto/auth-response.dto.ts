import { Expose, plainToInstance } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

export class UserDto {
  @ApiProperty({ example: '1a2b3c', description: 'Unique user ID' })
  @Expose()
  id: string;

  @ApiProperty({ example: 'john_doe', description: 'Username of the user' })
  @Expose()
  username: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'Email address of the user',
  })
  @Expose()
  email: string;

  @ApiProperty({ example: 'Software developer', required: false })
  @Expose()
  bio?: string | null;

  @ApiProperty({ example: 'user', description: 'Role assigned to the user' })
  @Expose()
  role: string;

  @ApiProperty({ example: '2025-01-01T12:00:00.000Z' })
  @Expose()
  createdAt: Date;

  @ApiProperty({ example: '2025-01-10T12:00:00.000Z' })
  @Expose()
  updatedAt: Date;

  static from(user: User) {
    return plainToInstance(UserDto, user, { excludeExtraneousValues: true });
  }
}

export class AuthResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  token: string;

  @ApiProperty({ type: () => UserDto })
  user: UserDto;
}
