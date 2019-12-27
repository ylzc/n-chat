import { Expose, Transform } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class ListEventDto {

    @IsString()
    @Expose()
    spaceId!: string;

    @IsNumber()
    @IsOptional()
    @Transform(value => value ? Number(value) : value)
    @Expose()
    eventId!: number;

    @IsNumber()
    @Transform(value => Number(value))
    @Expose()
    step!: number;

    @IsBoolean()
    @Transform(value => value === 'true')
    @Expose()
    type!: boolean;

}

