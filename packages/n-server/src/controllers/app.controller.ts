import { Controller, Get, Inject, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppService } from '../services/app.service';

@Controller()
export class AppController {
	@Inject(AppService)
	private readonly appService: AppService;
	@Inject(JwtService)
	private readonly jwtService: JwtService;

	@Post('/login')
	login() {
		return {
			access_token: this.jwtService
				.sign(
					{
						id: 1,
					},
					{
						expiresIn: 3600 * 10,
					},
				),
		};
	}
}
