import { EventTypes } from "@n-chat/common";
import {
	BaseEntity,
	Column, CreateDateColumn, Entity, Index,
	JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn
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

	@CreateDateColumn({type: "timestamp"})
	createTime: number;

	@UpdateDateColumn({type: "timestamp"})
	updateTime: number;

	@OneToOne(
		type => UserEntity,
		user => user.id
	)
	@JoinColumn()
	creator: UserEntity;

	@Index()
	@Column({nullable: false})
	initId: string;

	@OneToOne(
		type => SpaceEntity,
		space => space.id
	)
	@JoinColumn()
	space: SpaceEntity;

}
