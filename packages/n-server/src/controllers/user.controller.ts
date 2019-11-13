import { RegisterUserDto } from "@n-chat/common";
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('user')
export class UserController {

	@Get('list')
	list() {
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
