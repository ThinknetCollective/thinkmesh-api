import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';


@Module({
imports: [
UsersModule,
JwtModule.registerAsync({
imports: [ConfigModule],
inject: [ConfigService],
useFactory: (cfg: ConfigService) => ({
secret: cfg.get('JWT_SECRET'),
signOptions: { expiresIn: cfg.get('JWT_EXPIRES_IN') || '7d' },
}),
}),
],
providers: [AuthService, JwtStrategy],
controllers: [AuthController],
exports: [],
})
export class AuthModule {}