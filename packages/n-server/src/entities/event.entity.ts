import { EventTypes } from "@n-chat/common";
import { Transform } from "class-transformer";
import {
	BaseEntity,
	Column, CreateDateColumn, Entity, Index,
	JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn
} from "typeorm";
import { SpaceEntity } from "./space.entity";
import { UserEntity } from "./user.entity";

@Entity()
export class EventEntity extends BaseEntity {

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Index()
	@Column({enum: EventTypes})
	eventType: EventTypes;

	@Column({nullable: false})
	content: string;

	@Transform(value => new Date(value).valueOf())
	@CreateDateColumn({type: "timestamptz"})
	createTime: number;

	@Transform(value => new Date(value).valueOf())
	@UpdateDateColumn({type: "timestamptz"})
	updateTime: number;

	@ManyToOne(
		type => UserEntity,
		user => user.id
	)
	@JoinColumn()
	creator: UserEntity;

	@Index()
	@Column({nullable: false, unique: true})
	initId: string;

	@ManyToOne(
		type => SpaceEntity,
		space => space.id
	)
	@JoinColumn()
	space: SpaceEntity;

}
