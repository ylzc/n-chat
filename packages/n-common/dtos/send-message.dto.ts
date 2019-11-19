import { Expose } from "class-transformer";
import { IsString } from "class-validator";

export class SendMessageDto {

	@Expose()
	@IsString()
	initId!: string;

	@Expose()
	@IsString()
	content!: string;

	@Expose()
	@IsString()
	eventType!: string;

}
