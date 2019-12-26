import { AddMemberDto } from '@n-chat/common/dtos/add-member.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransformClassToPlain } from 'class-transformer';
import { Like, Repository } from 'typeorm';
import { CreateSpaceDto, ListSpaceDto } from '@n-chat/common';
import { SpaceEntity } from '../entities/space.entity';
import { UserSpaceEntity } from '../entities/user-space.entity';
import { UserEntity } from '../entities/user.entity';
import isString from 'lodash/isString';

@Injectable()
export class SpaceService {

    @InjectRepository(SpaceEntity)
    protected readonly repo: Repository<SpaceEntity>;

    @InjectRepository(UserEntity)
    protected readonly user: Repository<UserEntity>;

    @InjectRepository(UserSpaceEntity)
    protected readonly us: Repository<UserSpaceEntity>;

    async addMembers(data: AddMemberDto) {
        const space = await this.repo.findOne(data.spaceId, {relations: ['members']});
        if (space) {
            if (data.userIds) {
                let ids = data.userIds.filter(id => isString(id));
                if (space.members) {
                    ids = ids.filter(id => !space.members.find(m => m.id === id));
                }
                else {
                    space.members = [];
                }
                if (ids.length) {
                    const users = await this.user
                        .findByIds(ids);
                    if (users.length) {
                        space.members = space.members.concat(users);
                        return await space.save();
                    }
                }
            }
        }
        return space;
    }

    @TransformClassToPlain()
    async list(params: ListSpaceDto) {
        let v = params.pageNum; // skip需要从0开始
        if (!isNaN(v) && isFinite(v) && v >= 1) {
            v = v - 1;
        }
        else {
            v = 0;
        }
        const [data, count] = await this.repo
            .findAndCount({
                skip: v,
                take: params.pageSize,
                relations: ['owner', 'members'],
            });
        return {
            data,
            count,
        };
    }

    async listIdByUser(userId: string) {
        return await this.repo
            .createQueryBuilder('space')
            .select('space.id')
            .innerJoin(
                'space.members', 'member',
                'member.id = :userId', {userId}
            )
            .getMany();
    }

    @TransformClassToPlain()
    async listUserInMembers(userId: string) {
        return await this.repo
            .createQueryBuilder('space')
            .innerJoin(
                'space.members', 'member',
                'member.id = :userId', {userId}
            )
            .loadAllRelationIds({relations: ['members', 'owner']})
            .getMany();
    }

    @TransformClassToPlain()
    async create(space: CreateSpaceDto) {
        const users = await this.user.findByIds([...space.members, space.owner]);
        const owner = users.find(u => u.id === space.owner);
        const temp = new SpaceEntity();
        temp.owner = owner;
        temp.members = users;
        temp.name = space.name;
        return await this.repo.save(temp);
    }

    async checkUserInSpace(spaceId: string, userId: string) {
        return await this.repo
            .createQueryBuilder('space')
            .select('space.id')
            .innerJoin(
                'space.members', 'member',
                'member.id = :userId', {userId}
            )
            .where({id: spaceId})
            .cache(true)
            .getOne();
    }

    async listChatSpace(userId: string) {
        return await this.us.find({
            userId
        });
    }

    async findByIds(ids: string[]) {
        return await this.repo.findByIds(ids, {
            loadRelationIds: {
                relations: ['members', 'owner']
            }
        });
    }
}
