import { Expose } from "class-transformer";
import { IsEnum, IsString } from "class-validator";
import { EventTypes } from "../utils/enums";

export class SendMessageDto {

	@Expose()
	@IsString()
	initId!: string;

	@Expose()
	@IsString()
	content!: string;

	@Expose()
	@IsEnum(EventTypes)
	eventType!: EventTypes;

	@Expose()
	@IsString()
	spaceId!: string;

	@Expose()
	@IsString()
	creatorId!: string;

}
