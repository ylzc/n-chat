import { ApiModelProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsArray, IsString } from "class-validator";

export class AddMemberDto {

	@ApiModelProperty({
		type: String
	})
	@IsString()
	@Expose()
	spaceId!: string;

	@ApiModelProperty({
		type: [String]
	})
	@IsArray()
	@Expose()
	userIds!: string[]

}
