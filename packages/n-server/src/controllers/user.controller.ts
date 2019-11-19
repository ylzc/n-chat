import { RegisterUserDto } from "@n-chat/common";
import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { UserService } from "../services/user.service";

@Controller('user')
export class UserController {

	@Inject(UserService)
	private readonly userService: UserService;

	@Get('list')
	async list() {
		return await this.userService.list()
	}

	@Post('delete')
	delete() {
	}

	@Post('update')
	update() {
	}

	@Post('change-password')
	changePwd() {
	}

}
