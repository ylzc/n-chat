import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";
import { Expose, Transform } from 'class-transformer';
import { IsNumber, IsNumberString, IsOptional, IsString, Validate } from 'class-validator';

export class ListSpaceDto {

	@ApiModelProperty()
	@IsNumber()
	@Transform(value => parseInt(value))
	@Expose()
	pageNum!: number;

	@ApiModelProperty()
	@IsNumber()
	@Transform(value => parseInt(value))
	@Expose()
	pageSize!: number;

}
