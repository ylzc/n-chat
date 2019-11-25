import {
	Body, Controller, Get, Inject, Post, Query, Req, UseGuards
} from '@nestjs/common';
import { CreateSpaceDto, ListSpaceDto, UserId } from '@n-chat/common';
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { ApiImplicitBody, ApiImplicitQuery } from "@nestjs/swagger";
import { SpaceService } from '../services/space.service';

@UseGuards(AuthGuard('jwt'))
@Controller('space')
export class SpaceController {

	@Inject(SpaceService)
	private readonly service: SpaceService;
	@Inject(JwtService)
	private readonly jwtService: JwtService;

	@Post('create')
	@ApiImplicitBody({name: 'create-space', type: CreateSpaceDto})
	async create(@UserId() id: string, @Body() createSpaceDto: CreateSpaceDto) {
		createSpaceDto.owner = id;
		return await this.service.create(createSpaceDto)
	}

	@Get('list')
	async list(@Query() params: ListSpaceDto) {
		return await this.service.list(params);
	}

	@Get('list-user-in-members')
	@ApiImplicitQuery({name: 'userId', type: {}})
	async listUserInMembers(
		@UserId() id: string,
		@Query('userId') userId: string
	) {
		return await this.service.listUserInMembers(userId || id);
	}

	@Get('list-id-by-user')
	@ApiImplicitQuery({name: 'userId', type: {}})
	async listIdByUser(
		@UserId() id: string,
		@Query('userId') userId: string
	) {
		return await this.service.listIdByUser(userId || id);
	}

	@Post('delete')
	delete() {
	}

	@Post('update')
	update() {
	}

}
