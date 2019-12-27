import { SendMessageDto } from "@n-chat/common";
import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Socket } from "socket.io";
import { EventEntity } from "../entities/event.entity";
import { EventService } from "./event.service";
import { SpaceService } from "./space.service";
import { HandleMessages, SpaceMessages } from '../types/chat';

@Injectable()
export class ChatService {
	@Inject(JwtService)
	private readonly jwt: JwtService;

	@Inject(SpaceService)
	private readonly space: SpaceService;

	@Inject(EventService)
	private readonly event: EventService;

	async joinRooms(userId: string, client: Socket) {
		const temp = await this.space.listIdByUser(userId);
		client.join(temp.map(t => t.id));
	}

	getUser(client: Socket): any {
		return this.jwt.decode(client.handshake.query.token) || {};
	}

	async handleMessage(data: SendMessageDto, client: Socket) {
		if (!data.creatorId) {
			data.creatorId = this.getUser(client).id;
		}
		const space = await this.space.checkUserInSpace(data.spaceId, data.creatorId);
		if (space) {
			return await this.event.create(data);
		}
		return null;
	}

	async handleMessages(data: SendMessageDto[], client: Socket): Promise<HandleMessages> {
		try {
			const messages: EventEntity[] = [];
			const map: SpaceMessages = {};
			for (let i = 0, l = data.length; i < l; i++) {
				try {
					const message = await this.handleMessage(data[i], client);
					if (message) {
						const spaceId = message.space.id;
						messages.push(message);
						if (!map[spaceId]) {
							map[spaceId] = []
						}
						map[spaceId].push(message);
					}
				} catch (e) {

				}
			}
			return [messages, map];
		} catch (e) {
			return [[], {}]
		}
	}
}