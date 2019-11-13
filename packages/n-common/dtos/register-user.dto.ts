import { Expose } from "class-transformer";
import { IsString } from "class-validator";

export class RegisterUserDto {

	@IsString()
	@Expose()
	account: string = '';

	@IsString()
	@Expose()
	name: string = '';

	@IsString()
	@Expose()
	password: string = '';

}
