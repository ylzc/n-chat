import { ListEventDto, SendMessageDto } from "@n-chat/common";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LessThan, MoreThan, Repository } from "typeorm";
import { EventEntity } from "../entities/event.entity";
import { SpaceEntity } from "../entities/space.entity";
import { UserEntity } from "../entities/user.entity";

@Injectable()
export class EventService {

	@InjectRepository(EventEntity)
	private readonly repo: Repository<EventEntity>;

	async create(message: SendMessageDto) {
		const temp = this.repo.create(message);
		temp.creator = new UserEntity();
		temp.creator.id = message.creatorId;
		temp.space = new SpaceEntity();
		temp.space.id = message.spaceId;
		return await temp.save();
	}

	async list(query: ListEventDto) {
		return await this.repo.find({
			take: query.step,
			where: {
				createTime: query.type
					? MoreThan(new Date(query.timestamp))
					: LessThan(new Date(query.timestamp)),
				space: {
					id: query.spaceId
				}
			},
			order: {
				createTime: "ASC"
			}
		})
	}
}
