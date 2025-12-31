import { Expose, Type } from "class-transformer";
import { IsEmail, IsNumber, IsString } from "class-validator";

export class SignupRequest {
	@IsString()
	name: string;

	@IsEmail()
	email: string;

	@IsString()
	phone: string;

	@IsString()
	password: string;

	@IsNumber({}, { each: true })
	@Type(() => Number)
	@Expose({ name: 'role_ids' })
	roleIds: number[];
}
