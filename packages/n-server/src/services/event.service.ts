import { SendMessageDto } from "@n-chat/common";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EventEntity } from "../entities/event.entity";
import { SpaceEntity } from "../entities/space.entity";
import { UserEntity } from "../entities/user.entity";

@Injectable()
export class EventService {

	@InjectRepository(EventEntity)
	private readonly event: Repository<EventEntity>;

	async create(message: SendMessageDto) {
		const temp = this.event.create(message);
		temp.creator = new UserEntity();
		temp.creator.id = message.creatorId;
		temp.space = new SpaceEntity();
		temp.space.id = message.spaceId;
		return await temp.save();
	}
}
