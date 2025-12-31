import { Expose, Type, Transform } from "class-transformer";
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

	@IsNumber()
	@Transform(({ value, obj }) => Number(value ?? obj.companyId))
	@Expose({ name: 'company_id' })
	companyId: number;

	@IsNumber({}, { each: true })
	@Type(() => Number)
	@Expose({ name: 'role_ids' })
	roleIds: number[];
}
