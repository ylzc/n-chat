import { ApiModelProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsString } from "class-validator";

export class RegisterUserDto {

	constructor(o?: any) {
		if (o) {
			this.account = o.account;
			this.name = o.name;
			this.account = o.account;
		}
	}

	@ApiModelProperty()
	@IsString()
	@Expose()
	account!: string;

	@ApiModelProperty()
	@IsString()
	@Expose()
	name!: string;

	@ApiModelProperty()
	@IsString()
	@Expose()
	password!: string;

}
