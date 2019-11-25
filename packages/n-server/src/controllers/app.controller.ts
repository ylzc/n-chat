import { LoginDto, RegisterUserDto } from "@n-chat/common";
import { Body, Controller, Get, HttpException, HttpStatus, Inject, Post, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppService } from '../services/app.service';
import { UserService } from "../services/user.service";
import { Request } from "express";

@Controller()
export class AppController {
	@Inject(AppService)
	private readonly appService: AppService;
	@Inject(JwtService)
	private readonly jwtService: JwtService;
	@Inject(UserService)
	private readonly userService: UserService;

	@Post('/register')
	async register(@Body() data: RegisterUserDto) {
		return await this.userService.create(data);
	}

	@Post('/login')
	async login(@Body() data: LoginDto) {
		return await this.appService.check(data)
	}

	@Post('/check-token')
	async checkToken(@Req() req: Request) {
		try {
			return await this.jwtService.verifyAsync(req.header('access_token'))
		} catch (e) {
			throw new HttpException('错误的token', HttpStatus.UNAUTHORIZED);
		}
	}
}
