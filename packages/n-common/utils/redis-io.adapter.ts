import { INestApplicationContext } from "@nestjs/common";
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { RedisAdapter, SocketIORedisOptions } from "socket.io-redis";
import redisIoAdapter from 'socket.io-redis';

export class RedisIoAdapter extends IoAdapter {
	redisAdapter: RedisAdapter;

	constructor(appOrHttpServer: INestApplicationContext | any,
				opt: SocketIORedisOptions) {
		super();
		this.redisAdapter = redisIoAdapter(opt);
	}

	createIOServer(port: number, options?: ServerOptions): any {
		const server = super.createIOServer(port, options);
		server.adapter(this.redisAdapter);
		return server;
	}
}
