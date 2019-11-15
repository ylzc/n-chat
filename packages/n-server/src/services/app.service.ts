import { LoginDto } from "@n-chat/common";
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { UserService } from "./user.service";

@Injectable()
export class AppService {
	@Inject(JwtService)
	private readonly jwtService: JwtService;
	@Inject(UserService)
	private readonly userService: UserService;

	async check(data: LoginDto) {
		const user = await this.userService.findByAccount(data.account);
		if (user && user.password === data.password) {
			return {
				access_token: this.jwtService
					.sign(
						{
							id: user.id,
						},
						{
							expiresIn: 3600 * 10,
						},
					),
			};
		}
		throw new HttpException('登录失败', HttpStatus.UNAUTHORIZED)
	}
}
