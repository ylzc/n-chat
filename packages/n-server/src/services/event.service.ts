import { ListEventDto, SendMessageDto } from '@n-chat/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, MoreThan, Repository, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { FindConditions } from 'typeorm/find-options/FindConditions';
import { EventEntity } from '../entities/event.entity';
import { SpaceEntity } from '../entities/space.entity';
import { UserEntity } from '../entities/user.entity';

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
        const where: FindConditions<EventEntity> = {
            space: {
                id: query.spaceId
            }
        };
        if (query.eventId) {
            where.id = query.type
                ? MoreThan(query.eventId)
                : LessThan(query.eventId);
        }
        return await this.repo.find({
            take: query.step,
            where,
            order: {
                id: query.type ? 'ASC' : 'DESC'
            },
            loadRelationIds: {
                relations: ['space', 'creator']
            }
        });
    }

    async listByQuery(query: ListEventDto) {
        const sql = this.repo.createQueryBuilder('event')
            .where('event.space.id = :id', {id: query.spaceId})
            .loadAllRelationIds({
                relations: ['space', 'creator']
            })
            .orderBy('event.id', query.type ? 'ASC' : 'DESC')
            .take(query.step);
        if (query.eventId) {
            sql.andWhere(`event.id ${query.type ? '>' : '<'} :id`, {id: query.eventId});
        }
        return await sql.getMany();
    }
}
