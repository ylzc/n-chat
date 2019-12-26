import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({
    name: 'space_members_user'
})
export class UserSpaceEntity {

    @PrimaryColumn()
    spaceId: string;

    @PrimaryColumn()
    userId: string;

    @Column({default: 0})
    atCount: number;

    @Column({default: 0})
    eventCount: number;

}
