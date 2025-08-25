import { Expose, plainToInstance } from 'class-transformer';
import { User } from '../../users/user.entity';


export class UserDto {
@Expose() id: string;
@Expose() username: string;
@Expose() email: string;
@Expose() bio?: string | null;
@Expose() role: string;
@Expose() createdAt: Date;
@Expose() updatedAt: Date;


static from(user: User) {
return plainToInstance(UserDto, user, { excludeExtraneousValues: true });
}
}


export class AuthResponseDto {
token: string;
user: UserDto;
}