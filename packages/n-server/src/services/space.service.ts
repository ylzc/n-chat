import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransformClassToPlain } from 'class-transformer';
import { Like, Repository } from 'typeorm';
import { CreateSpaceDto, ListSpaceDto } from '@n-chat/common';
import { SpaceEntity } from '../entities/space.entity';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class SpaceService {

	@InjectRepository(SpaceEntity)
	protected readonly repo: Repository<SpaceEntity>;

	@InjectRepository(UserEntity)
	protected readonly user: Repository<UserEntity>;

	@TransformClassToPlain()
	async list(params: ListSpaceDto) {
		let v = params.pageNum; // skip需要从0开始
		if (!isNaN(v) && isFinite(v) && v >= 1) {
			v = v - 1;
		} else {
			v = 0;
		}
		const [data, count] = await this.repo
			.findAndCount({
				skip: v,
				take: params.pageSize,
				where: {
					name: Like(`%${params.keyword}%`),
					owner: {
						id: params.userId
					},
				},
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
				"member.id = :userId", {userId}
			)
			.getMany();
	}

	@TransformClassToPlain()
	async listUserInMembers(userId: string) {
		return await this.repo
			.createQueryBuilder('space')
			.innerJoin(
				'space.members', 'member',
				"member.id = :userId", {userId}
			)
			.loadAllRelationIds({relations: ['members']})
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
}
