import { Expose } from "class-transformer";
import { IsEmail, IsNumber, IsString } from "class-validator";

export class LoginRequest {
	@IsEmail()
	email: string;

	@IsString()
	password: string;

	@IsNumber()
	@Expose({ name: 'company_id' })
	companyId: number;
}
