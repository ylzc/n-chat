import { Expose, Transform } from 'class-transformer';
import { IsNumber, IsNumberString, IsOptional, IsString, Validate } from 'class-validator';

export class ListSpaceDto {

	@IsString()
	@IsOptional()
	@Expose()
	keyword?: string;

	@IsNumber()
	@Transform(value => parseInt(value))
	@Expose()
	pageNum!: number;

	@IsNumber()
	@Transform(value => parseInt(value))
	@Expose()
	pageSize!: number;

	@IsString()
	@IsOptional()
	@Expose()
	userId!: string;

}
