import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromHeader('access_token'),
			ignoreExpiration: false,
			secretOrKey: 'yel',
		});
	}

	async validate(payload: any) {
		return {
			id: payload.id
		};
	}
}
