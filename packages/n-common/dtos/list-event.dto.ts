import { Expose, Transform } from "class-transformer";
import { IsBoolean, IsNumber, IsString } from "class-validator";

export class ListEventDto {

	@IsString()
	@Expose()
	spaceId!: string;

	@IsNumber()
	@Transform(value => Number(value))
	@Expose()
	timestamp!: number;

	@IsNumber()
	@Transform(value => Number(value))
	@Expose()
	step!: number;

	@IsBoolean()
	@Transform(value => Boolean(value))
	@Expose()
	type!: boolean;

}

