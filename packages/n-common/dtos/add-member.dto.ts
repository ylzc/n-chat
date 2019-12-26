import { Expose } from "class-transformer";
import { IsArray, IsString } from "class-validator";

export class AddMemberDto {

	@IsString()
	@Expose()
	spaceId!: string;

	@IsArray()
	@Expose()
	userIds!: string[]

}
