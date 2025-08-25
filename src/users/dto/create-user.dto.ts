import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'muhammad', description: 'Unique username (3–50 characters)' })
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  username: string;

  @ApiProperty({ example: 'mdauwal@example.com', description: 'Valid email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'strongPass123', description: 'Password (8–72 characters)' })
  @IsString()
  @MinLength(8)
  @MaxLength(72)
  password: string;

  @ApiPropertyOptional({ example: 'I love coding and Data', description: 'User bio (optional)' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  bio?: string;
}
