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

	@IsString()
	@Expose()
	account!: string;

	@IsString()
	@Expose()
	name!: string;

	@IsString()
	@Expose()
	password!: string;

}
