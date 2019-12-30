import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './controllers/app.controller';
import { ChatController } from './controllers/chat.controller';
import { SpaceController } from './controllers/space.controller';
import { EventEntity } from './entities/event.entity';
import { UserSpaceEntity } from './entities/user-space.entity';
import { AppService } from './services/app.service';
import { ChatGateway } from './controllers/chat.gateway';
import { SpaceEntity } from './entities/space.entity';
import { UserEntity } from './entities/user.entity';
import { UserController } from './controllers/user.controller';
import { ChatService } from './services/chat.service';
import { EventService } from './services/event.service';
import { JwtStrategy } from './services/jwt.strategy';
import { SpaceService } from './services/space.service';
import { UserService } from './services/user.service';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: 'yel',
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            username: 'postgres',
            database: 'postgres',
            entities: [
                SpaceEntity,
                UserEntity,
                EventEntity,
                UserSpaceEntity
            ],
            synchronize: false,
            host: 'localhost',
            port: 5432
            // cache
        }),
        TypeOrmModule.forFeature([
            SpaceEntity,
            UserEntity,
            EventEntity,
            UserSpaceEntity
        ]),
    ],
    controllers: [
        AppController,
        UserController,
        SpaceController,
        ChatController
    ],
    providers: [
        AppService,
        ChatGateway,
        UserService,
        SpaceService,
        JwtStrategy,
        EventService,
        ChatService
    ],
})
export class AppModule {
}
