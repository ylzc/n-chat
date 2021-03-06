import { RegisterUserDto } from "@n-chat/common";
import { Body, Controller, Get, Inject, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiUseTags } from "@nestjs/swagger";
import { UserService } from "../services/user.service";

@ApiBearerAuth()
@ApiUseTags('user')
@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {

	@Inject(UserService)
	private readonly userService: UserService;

	@Get('list')
	async list() {
		return await this.userService.list()
	}

	@Get('sync-user')
	async syncUser(@Query('updateTime', ParseIntPipe) updateTime: number) {
		//TODO:增量更新人员 缺陷--系统运行一段时间后新客户端必然需要一次性获取大量现有的人员
		return await this.userService.syncUser(updateTime);
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
