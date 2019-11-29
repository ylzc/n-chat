import { ApiModelProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsEnum, IsString } from "class-validator";
import { EventTypes } from "../utils/enums";

export class SendMessageDto {

	@ApiModelProperty()
	@Expose()
	@IsString()
	initId!: string;

	@ApiModelProperty()
	@Expose()
	@IsString()
	content!: string;

	@ApiModelProperty()
	@Expose()
	@IsEnum(EventTypes)
	eventType!: EventTypes;

	@ApiModelProperty()
	@Expose()
	@IsString()
	spaceId!: string;

	@ApiModelProperty()
	@Expose()
	@IsString()
	creatorId!: string;

}
