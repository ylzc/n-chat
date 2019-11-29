import { SendMessageDto } from "@n-chat/common";
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
	WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, WebSocketServer,
	OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from "../services/chat.service";
import { EventService } from "../services/event.service";
import { SpaceService } from "../services/space.service";

@WebSocketGateway({transports: ['websocket']})
export class ChatGateway implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect {

	@Inject(JwtService)
	private readonly jwt: JwtService;

	@Inject(SpaceService)
	private readonly space: SpaceService;

	@Inject(EventService)
	private readonly event: EventService;

	@Inject(ChatService)
	private readonly chat: ChatService;

	@WebSocketServer()
	server: Server;

	afterInit(server: Server): any {
		server.use(async (client, next) => {
			try {
				const handshake = client.handshake;
				await this.jwt.verifyAsync(handshake.query.token);
				next();
			} catch (e) {
				client.error(new HttpException('token 异常', HttpStatus.UNAUTHORIZED));
				client.disconnect();
			}
		});
	}

	async handleConnection(client: Socket, ...args) {
		try {
			const user: any = this.jwt.decode(client.handshake.query.token);
			const userId: string = user.id;
			client.join(userId);
			await this.chat.joinRooms(userId, client);
			client.emit('init', {message: 'join rooms success'});
		} catch (e) {
			return e;
		}
	}

	async handleDisconnect(client: Socket) {
	}

	@SubscribeMessage('send-message')
	async sendMessage(@MessageBody() data: SendMessageDto, @ConnectedSocket() client: Socket) {
		try {
			const message = await this.chat.handleMessage(data, client);
			if (message) {
				setTimeout(() => {
					client.to(data.spaceId).emit('event', message);
				}, 0);
				return {event: 'event', data: message};
			}
		} catch (e) {

		}
	}

	@SubscribeMessage('send-messages')
	async sendMessages(@MessageBody() data: SendMessageDto[], @ConnectedSocket() client: Socket) {
		try {
			const [messages, map] = await this.chat.handleMessages(data, client);
			setTimeout(() => {
				Object.keys(map).forEach((spaceId) => {
					client.to(spaceId).emit('events', map[spaceId]);
				})
			}, 0);
			return {event: 'events', data: messages};
		} catch (e) {

		}
	}

}
