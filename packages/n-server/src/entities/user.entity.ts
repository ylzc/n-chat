import {
	BaseEntity, Column, CreateDateColumn, Entity, Index, ManyToMany, OneToMany, PrimaryColumn,
	PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm';
import { Exclude, Transform } from 'class-transformer';
import { SpaceEntity } from './space.entity';
import dayjs from 'dayjs';

@Entity('user')
export class UserEntity extends BaseEntity {

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Index()
	@Column({unique: true, nullable: false})
	account: string;

	@Column({nullable: false})
	name: string;

	@Exclude()
	@Column({nullable: false})
	password: string;

	@Exclude()
	@Column({nullable: false})
	salt: string;

	@ManyToMany(
		type => SpaceEntity,
		space => space.members,
	)
	spaces: SpaceEntity[];

	@OneToMany(
		type => SpaceEntity,
		space => space.owner
	)
	adminSpaces: SpaceEntity[];

	@Transform(value => new Date(value).valueOf())
	@CreateDateColumn({type: "timestamptz"})
	createTime: number;

	@Transform(value => new Date(value).valueOf())
	@UpdateDateColumn({type: "timestamptz"})
	updateTime: number;

}
