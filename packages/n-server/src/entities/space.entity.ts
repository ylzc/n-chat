import { Transform } from "class-transformer";
import {
	BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne,
	OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm';
import { EventEntity } from "./event.entity";
import { UserEntity } from './user.entity';

@Entity('space')
export class SpaceEntity extends BaseEntity {

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ManyToMany(
		type => UserEntity,
		user => user.spaces,
	)
	@JoinTable()
	members: UserEntity[];

	@ManyToOne(
		type => UserEntity,
		user => user.adminSpaces
	)
	owner: UserEntity;

	@Column({nullable: false})
	name: string;

	@OneToOne(
		type => EventEntity,
		ev => ev.id
	)
	@JoinColumn()
	message: EventEntity;

	@Transform(value => new Date(value).valueOf())
	@CreateDateColumn({type: "timestamptz"})
	createTime: number;

	@Transform(value => new Date(value).valueOf())
	@UpdateDateColumn({type: "timestamptz"})
	updateTime: number;

}
