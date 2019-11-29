import { ApiModelProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsString } from "class-validator";

export class LoginDto {

	@ApiModelProperty()
	@IsString()
	@Expose()
	account!: string;

	@ApiModelProperty()
	@IsString()
	@Expose()
	password!: string;
}
