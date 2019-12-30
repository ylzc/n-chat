import { ListEventDto, UserId } from '@n-chat/common';
import { Controller, Get, Inject, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { ChatService } from '../services/chat.service';
import { EventService } from '../services/event.service';

@ApiBearerAuth()
@ApiUseTags('chat')
@UseGuards(AuthGuard('jwt'))
@Controller('chat')
export class ChatController {

    @Inject(ChatService)
    private readonly chat: ChatService;
    @Inject(EventService)
    private readonly event: EventService;

    @Get('list')
    async list(@Query() query: ListEventDto) {
        return await this.event.list(query);
    }

    @Get('read')
    async read(@Query('spaceId') spaceId, @UserId() userId) {
        return await this.chat.read(userId, spaceId);
    }

}
