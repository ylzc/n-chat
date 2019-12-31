import { AppService } from './app.service';
import { ChatService } from './chat.service';
import { EventService } from './event.service';
import { EventsQueueService } from './events-queue.service';
import { EventsConsumer } from './events.consumer';
import { JwtStrategy } from './jwt.strategy';
import { SpaceService } from './space.service';
import { UserService } from './user.service';

export const providers = [
    AppService,
    UserService,
    SpaceService,
    JwtStrategy,
    EventService,
    ChatService,
    EventsQueueService,
    EventsConsumer
];
