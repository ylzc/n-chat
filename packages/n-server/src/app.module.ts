import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { controllers, ChatGateway } from './controllers';
import { entities } from './entities';
import { providers } from './services';
import { BullModule } from '@nestjs/bull';

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
            entities,
            synchronize: false,
            host: 'localhost',
            port: 5432
            // cache
        }),
        TypeOrmModule.forFeature(entities),
        BullModule.registerQueue({
            name: 'events',
            redis: {
                host: 'localhost',
                port: 6379,
            },
        }),
    ],
    controllers,
    providers: [
        ...providers,
        ChatGateway
    ],
})
export class AppModule {
}
