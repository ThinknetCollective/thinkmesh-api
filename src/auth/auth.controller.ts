import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ReqUser } from './req-user.decorator'; // assuming custom decorator
import { AuthResponseDto } from './dto/user.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
    type: AuthResponseDto,
  })
  async register(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.authService.register(
      createUserDto.username,
      createUserDto.email,
      createUserDto.password,
    );
  }

  @Post('login')
  @ApiOperation({ summary: 'Authenticate a user and return JWT token' })
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully',
    type: AuthResponseDto,
  })
  async login(@Body() req: { username: string; password: string }) {
    return this.authService.login(req.username, req.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get the currently logged-in user' })
  @ApiResponse({
    status: 200,
    description: 'Authenticated user details',
    type: UserDto,
  })
  me(@ReqUser() user: { userId: string; email: string; role: string }) {
    return user; // comes from JwtStrategy.validate
  }
}
