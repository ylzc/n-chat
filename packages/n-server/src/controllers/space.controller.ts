import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { CreateSpaceDto } from '../dtos/create-space.dto';
import { ListSpaceDto } from '../dtos/list-space.dto';
import { SpaceService } from '../services/space.service';

@Controller('space')
export class SpaceController {

	@Inject(SpaceService)
	private readonly service: SpaceService;

	@Post('create')
	async create(@Body() createSpaceDto: CreateSpaceDto) {
		return  await this.service.create(createSpaceDto)
	}

	@Get('list')
	async list(@Query() params: ListSpaceDto) {
		return await this.service.list(params);
	}

	@Post('delete')
	delete() {
	}

	@Post('update')
	update() {
	}

}
