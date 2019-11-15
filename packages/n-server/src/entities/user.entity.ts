import {
	BaseEntity, Column, Entity, Index, ManyToMany, OneToMany, PrimaryColumn,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { SpaceEntity } from './space.entity';

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

	@OneToMany(type => SpaceEntity, space => space.owner)
	adminSpaces: SpaceEntity[];

}
