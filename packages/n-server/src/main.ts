import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { logger, RedisIoAdapter } from "@n-chat/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from './app.module';
import express from 'express';

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
	// app.useWebSocketAdapter(new RedisIoAdapter(
	// 	app,
	// 	{
	// 		host: 'localhost',
	// 		port: 6379
	// 	}
	// ));
	app.useStaticAssets(
		'static',
		{
			index: ['index.html']
		}
	);
	app.useGlobalPipes(new ValidationPipe({
		transform: true,
		transformOptions: {
			strategy: 'excludeAll',
		},
	}));
	app.useGlobalInterceptors(
		new ClassSerializerInterceptor(app.get(Reflector))
	);

	const options = new DocumentBuilder()
		.setTitle('n-chat')
		.setDescription('a chat example')
		.setVersion('1.0')
		.addBearerAuth('access_token', "header")
		.build();
	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup('swagger-ui.html', app, document);

	await app.listen(3000);
	logger.log('start on 3000', 'N-CHAT');
}

bootstrap().catch(logger.error);
