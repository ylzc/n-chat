import { SendMessageDto } from "@n-chat/common";
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
	WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, WebSocketServer,
	OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
// import { RedisAdapter } from 'socket.io-redis';
import { SpaceService } from "../services/space.service";

@WebSocketGateway({transports: ['websocket']})
export class ChatGateway implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect {

	@Inject(JwtService)
	private readonly jwt: JwtService;

	@Inject(SpaceService)
	private readonly space: SpaceService;

	@WebSocketServer()
	server: Server;

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
	}

	async joinRooms(userId: string, client: Socket) {
		const temp = await this.space.listIdByUser(userId);
		client.join(temp.map(t => t.id));
	}

	async handleConnection(client: Socket, ...args) {
		try {
			const user: any = this.jwt.decode(client.handshake.query.token);
			const userId: string = user.id;
			client.join(userId);
			await this.joinRooms(userId, client);
			client.send('connect success');
		} catch (e) {
			return e;
		}
	}

	async handleDisconnect(client: Socket) {
	}

	@SubscribeMessage('send')
	send(@MessageBody() data: SendMessageDto, @ConnectedSocket() client: Socket) {
		return {event: 'event', data};
	}

}
