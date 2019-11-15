import { Expose, Transform } from 'class-transformer';
import { IsNumberString, IsOptional, IsString, Validate } from 'class-validator';

export class ListSpaceDto {

	@IsString()
	@IsOptional()
	@Expose()
	keyword?: string;

	@Transform(value => parseInt(value))
	@IsNumberString()
	@Expose()
	pageNum!: number;

	@Transform(value => parseInt(value))
	@IsNumberString()
	@Expose()
	pageSize!: number;

	@IsString()
	@IsOptional()
	@Expose()
	userId!: string;

}
