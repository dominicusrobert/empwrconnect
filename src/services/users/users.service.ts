import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

import { DataSourceService } from '../../data-source/data-source.service';

import { LoginRequest } from './dto/login.request';
import { LoginResponse } from './dto/login.response';

import { UserRepository } from './repositories/user.repository';
import { hashPassword, validatePassword } from '../../utils/functions/password.helper';
import { SignupRequest } from './dto/signup.request';
import { SignupResponse } from './dto/signup.response';
import { TokenUserDetail } from '../../utils/dto/token-user-detail.dto';
import { UserEntity } from './entities/user.entity';


@Injectable()
export class UsersService {
    constructor(
		private readonly dataSource: DataSourceService,
		private readonly configService: ConfigService,
		private readonly jwtService: JwtService,
		private readonly userRepo: UserRepository,
    ) {
        
    }

    async signup(request: SignupRequest): Promise<SignupResponse> {
		const password = await hashPassword(request.password);

		await this.dataSource.transaction(new TokenUserDetail(), async (queryRunner) => {
			const savedUser = await queryRunner.save(
				UserEntity,
				{ 
					name: request.name,
					email: request.email,
					phone: request.phone,
					password: password,
				},
			);

			const roleEntities = request.roleIds.map((id) => ({ id }));

			savedUser.roles = roleEntities as any;
			await queryRunner.save(UserEntity, savedUser);
		});

		return new SignupResponse();
    }

	async login(request: LoginRequest): Promise<LoginResponse> {
		const user = await this.userRepo.findByEmail(request.email.toLowerCase());

		const isMatchPassword = await validatePassword(user.password, request.password);
		if (!isMatchPassword) {
			throw new UnauthorizedException('This credential does not match with our record!');
		}

        const jwtPayload = await this.userRepo.generateJwtPayload(request.email);
		const jwtOptions = this.generateJwtSignOptions();
		const token = this.jwtService.sign(jwtPayload, jwtOptions);

		const result = new LoginResponse();
		result.name = user.name;
		result.token = token;

        return result;
    }


	/** ****************************************************************** **/
	/**                              Private                               **/
	/** ****************************************************************** **/

	private generateJwtSignOptions(): JwtSignOptions {
		const secret = this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET');
		const expiresIn = this.configService.get<number>('JWT_ACCESS_TOKEN_EXPIRATION');
		return { secret, expiresIn };
	}
}
