import { Body, Controller, Get, Inject, Post, Query, Req, UseGuards } from '@nestjs/common';
import { CreateSpaceDto, ListSpaceDto, UserId } from '@n-chat/common';
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { ApiImplicitBody } from "@nestjs/swagger";
import { SpaceService } from '../services/space.service';

@Controller('space')
export class SpaceController {

	@Inject(SpaceService)
	private readonly service: SpaceService;
	@Inject(JwtService)
	private readonly jwtService: JwtService;

	@UseGuards(AuthGuard('jwt'))
	@Post('create')
	@ApiImplicitBody({name: 'create-space', type: CreateSpaceDto})
	async create(@Body() createSpaceDto: CreateSpaceDto, @UserId() id: string) {
		createSpaceDto.owner = id;
		return await this.service.create(createSpaceDto)
	}

	@Get('list')
	async list(@Query() params: ListSpaceDto) {
		return await this.service.list(params);
	}

	@UseGuards(AuthGuard('jwt'))
	@Get('list-user-in-members')
	async listUserInMembers(@UserId() id: string,) {
		return await this.service.listUserInMembers(id);
	}

	@Get('list-by-user-id')
	async listByUserId(@Query('userId') id: string,) {
		return await this.service.listUserInMembers(id);
	}

	@Post('delete')
	delete() {
	}

	@Post('update')
	update() {
	}

}
