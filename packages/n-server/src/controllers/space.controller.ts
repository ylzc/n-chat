import {Body, Controller, Get, Inject, Post, Query} from '@nestjs/common';
import {CreateSpaceDto, ListSpaceDto} from '@n-chat/common';
import {ApiImplicitBody} from "@nestjs/swagger";
import {SpaceService} from '../services/space.service';

@Controller('space')
export class SpaceController {

    @Inject(SpaceService)
    private readonly service: SpaceService;

    @Post('create')
    @ApiImplicitBody({name: 'create-space', type: CreateSpaceDto})
    async create(@Body() createSpaceDto: CreateSpaceDto) {
        return await this.service.create(createSpaceDto)
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
