import { EventTypes } from "@n-chat/common";
import { Column, CreateDateColumn, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { SpaceEntity } from "./space.entity";
import { UserEntity } from "./user.entity";

@Entity()
export class EventEntity {

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Index()
	@Column({enum: EventTypes})
	eventType: EventTypes;

	@Column()
	content: string;

	@CreateDateColumn({type: "timestamp"})
	createTime: number;

	@OneToOne(
		type => UserEntity,
		user => user.id
	)
	@JoinColumn()
	creator: UserEntity;

	@Index()
	@Column()
	initId: string;

	@OneToOne(
		type => SpaceEntity,
		space => space.id
	)
	@JoinColumn()
	space: SpaceEntity;

}
