import {
	BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne,
	OneToMany, OneToOne, PrimaryGeneratedColumn
} from 'typeorm';
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

	@Column()
	name: string;

}
