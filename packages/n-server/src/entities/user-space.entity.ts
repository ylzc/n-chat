import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({
    name: 'space_members_user'
})
export class UserSpaceEntity {

    @PrimaryColumn({nullable: false, type: 'uuid'})
    spaceId: string;

    @PrimaryColumn({nullable: false, type: 'uuid'})
    userId: string;

    @Column({default: 0})
    atCount: number;

    @Column({default: 0})
    eventCount: number;

}
