import { ApiModelProperty } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";
import { IsBoolean, IsNumber, IsString } from "class-validator";

export class ListEventDto {

	@ApiModelProperty()
	@IsString()
	@Expose()
	spaceId!: string;

	@ApiModelProperty()
	@IsNumber()
	@Transform(value => Number(value))
	@Expose()
	timestamp!: number;

	@ApiModelProperty()
	@IsNumber()
	@Transform(value => Number(value))
	@Expose()
	step!: number;

	@ApiModelProperty()
	@IsBoolean()
	@Transform(value => Boolean(value))
	@Expose()
	type!: boolean;

}

