import { Expose } from 'class-transformer';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateSpaceDto {
    constructor(o?: any) {
        this.name = o?.name ?? '';
        this.members = o?.members ?? [];
        this.owner = o?.owner ?? '';
    }

    @IsString()
    @Expose()
    name!: string;

    @IsString({each: true})
    @IsArray()
    @IsOptional()
    @Expose()
    members!: string[];

    @IsString()
    @Expose()
    owner!: string;

}
