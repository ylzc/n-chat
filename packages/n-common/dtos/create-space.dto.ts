import { ApiModelProperty } from "@nestjs/swagger";
import { Expose } from 'class-transformer';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateSpaceDto {

	@ApiModelProperty()
	@IsString()
	@Expose()
	name!: string;

	@ApiModelProperty()
	@IsString({each: true})
	@IsArray()
	@IsOptional()
	@Expose()
	members!: string[];

	@ApiModelProperty()
	@IsString()
	@Expose()
	owner!: string;

}
