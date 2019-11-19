import { SendMessageDto } from "@n-chat/common";
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
	WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, WebSocketServer,
	OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RedisAdapter } from 'socket.io-redis';

@WebSocketGateway({transports: ['websocket']})
export class ChatGateway implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect {

	@Inject(JwtService)
	private readonly jwt: JwtService;

	@WebSocketServer()
	server: Server;

	userToClient: Map<string, Set<string>> = new Map();

	clientToUser: Map<string, string> = new Map();

	afterInit(server: Server): any {
		server.use(async (socket, next) => {
			try {
				const handshake = socket.handshake;
				await this.jwt.verifyAsync(handshake.query.token);
				next();
			} catch (e) {
				socket.error(new HttpException('token 异常', HttpStatus.UNAUTHORIZED));
				socket.disconnect(true);
			}
		});
		const adapter = server.adapter() as RedisAdapter;
		// console.info();
	}

	handleConnection(client: Socket, ...args) {
		try {
			const user: any = this.jwt.decode(client.handshake.query.token);
			const userId: string = user.id;
			let userSet = this.userToClient.get(userId);
			if (userSet) {
				userSet.forEach(clientId => {
					this.clientToUser.delete(clientId);
				});
			} else {
				userSet = new Set<string>();
				this.userToClient.set(userId, userSet);
			}
			userSet.add(client.id);
			this.clientToUser.set(client.id, userId);
		} catch (e) {
			return e;
		}
	}

	handleDisconnect(client: Socket) {
		const userId = this.clientToUser.get(client.id);
		const set = this.userToClient.get(userId);
		set.delete(client.id);
		this.clientToUser.delete(client.id);
	}

	@SubscribeMessage('events')
	handleEvent(@MessageBody() data: string, @ConnectedSocket() client: Socket): string {
		return data;
	}

	@SubscribeMessage('init')
	init(@MessageBody() data: { [s: string]: string }, @ConnectedSocket() client: Socket) {
		return data;
	}

	@SubscribeMessage('send')
	send(@MessageBody() data: SendMessageDto, @ConnectedSocket() client: Socket) {
		return data;
	}

}
