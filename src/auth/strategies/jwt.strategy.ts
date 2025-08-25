import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';


export type JwtPayload = { sub: string; email: string; role: string };


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
constructor(cfg: ConfigService) {
super({
jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
ignoreExpiration: false,
secretOrKey: cfg.get<string>('JWT_SECRET'),
});
}


async validate(payload: JwtPayload) {
// attaches to request.user
return { userId: payload.sub, email: payload.email, role: payload.role };
}
}