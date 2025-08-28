import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

export class AuthResponseDto {
  @ApiProperty()
  access_token: string;

  @ApiProperty({ type: () => User })
  user: User;
}
