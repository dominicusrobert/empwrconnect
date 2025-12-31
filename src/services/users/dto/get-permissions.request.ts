import { IsEmail, IsNumber, IsString } from "class-validator";

export class GetPermissionsRequest {
	@IsNumber()
	userId: number;

	@IsNumber()
	companyId: number;
}
