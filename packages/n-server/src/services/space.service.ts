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
		const [data, count] = await this.repo
			.findAndCount({
				skip: params.pageNum,
				take: params.pageSize,
				where: {
					name: Like(params.keyword),
				},
				relations: ['owner', 'members'],
			});
		return {
			data,
			count,
		};
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
