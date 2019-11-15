import { Expose } from "class-transformer";
import { IsString } from "class-validator";

export class LoginDto {

	@IsString()
	@Expose()
	account!: string;

	@IsString()
	@Expose()
	password!: string;
}
