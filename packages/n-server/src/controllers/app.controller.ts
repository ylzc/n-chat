import { LoginDto, RegisterUserDto } from "@n-chat/common";
import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppService } from '../services/app.service';
import { UserService } from "../services/user.service";

@Controller()
export class AppController {
	@Inject(AppService)
	private readonly appService: AppService;
	@Inject(JwtService)
	private readonly jwtService: JwtService;
	@Inject(UserService)
	private readonly userService: UserService;

	@Post('/register')
	register(@Body() data: RegisterUserDto) {
		return this.userService.create(data);
	}

	@Post('/login')
	login(@Body() data: LoginDto) {
		return this.appService.check(data)
	}
}
