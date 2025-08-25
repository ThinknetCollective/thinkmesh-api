import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.authService.register(
      createUserDto.username,
      createUserDto.email,
      createUserDto.password,
    );
  }

  @Post('login')
  async login(@Body() req: { username: string; password: string }) {
    return this.authService.login(req.username, req.password);
  }

  @UseGuards(JwtAuthGuard)
@Get('me')
me(@ReqUser() user: { userId: string; email: string; role: string }) {
return user; // from JwtStrategy.validate
}
}
