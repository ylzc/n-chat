import { Controller, Get, Post } from '@nestjs/common';

@Controller('user')
export class UserController {

	@Post('register')
	register() {
	}

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
