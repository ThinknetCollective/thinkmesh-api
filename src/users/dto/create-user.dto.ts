import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';


export class CreateUserDto {
@IsString()
@MinLength(3)
@MaxLength(50)
username: string;


@IsEmail()
email: string;


@IsString()
@MinLength(8)
@MaxLength(72)
password: string;


@IsOptional()
@IsString()
@MaxLength(500)
bio?: string;
}