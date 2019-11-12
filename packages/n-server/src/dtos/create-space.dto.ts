import { Expose } from 'class-transformer';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateSpaceDto {

	@IsString()
	@Expose()
	name: string;

	@IsString({ each: true })
	@IsArray()
	@IsOptional()
	@Expose()
	members: string[];

	@IsString()
	@Expose()
	owner: string;

}
