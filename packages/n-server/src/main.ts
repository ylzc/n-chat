import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as express from 'express';
import { RedisIoAdapter } from './utils/redis-io.adapter';

async function bootstrap() {
	const server = express();
	const app = await NestFactory
		.create<NestExpressApplication>(
			AppModule,
			new ExpressAdapter(server),
			{
				cors: true,
			},
		);
	app.useWebSocketAdapter(new RedisIoAdapter(app));
	app.useStaticAssets('static', { index: ['index.html'] });
	app.useGlobalPipes(new ValidationPipe({
		transform: true,
		transformOptions: {
			strategy: 'excludeAll',
		},
	}));
	await app.listen(3000);
}

bootstrap();
