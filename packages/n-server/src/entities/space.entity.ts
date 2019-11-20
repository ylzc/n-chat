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

	@CreateDateColumn({type: "timestamp"})
	createTime: number;

	@UpdateDateColumn({type: "timestamp"})
	updateTime: number;

}
