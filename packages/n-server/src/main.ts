import {ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {ExpressAdapter, NestExpressApplication} from '@nestjs/platform-express';
import {logger, RedisIoAdapter} from "@n-chat/common";
import {AppModule} from './app.module';
import * as express from 'express';

async function bootstrap() {
    const server = express();
    const app = await NestFactory
        .create<NestExpressApplication>(
            AppModule,
            new ExpressAdapter(server),
            {
                cors: true,
                logger
            },
        );
    app.useWebSocketAdapter(new RedisIoAdapter(app, {host: 'localhost', port: 6379}));
    app.useStaticAssets('static', {index: ['index.html']});
    app.useGlobalPipes(new ValidationPipe({
        transform: true,
        transformOptions: {
            strategy: 'excludeAll',
        },
    }));
    await app.listen(3000);
    logger.log('start on 3000', 'n-chat');
}

bootstrap();
