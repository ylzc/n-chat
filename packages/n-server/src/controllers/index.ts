import { AppController } from './app.controller';
import { ChatController } from './chat.controller';
import { SpaceController } from './space.controller';
import { UserController } from './user.controller';

export const controllers = [
    AppController,
    UserController,
    SpaceController,
    ChatController
];
export * from './chat.gateway';
