import {
	Injectable,
	CanActivate,
	ExecutionContext,
	UnauthorizedException,
	BadRequestException,
	ForbiddenException,
	InternalServerErrorException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { PermissionEnum } from '../../services/permissions/enums/permission.enum';

import { PERMISSION_KEY } from '../decorators/permission.decorator';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

import { TokenUserDetail } from '../dto/token-user-detail.dto';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private readonly reflector: Reflector,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const isPublicAccess = this.checkIsPublicAccess(context);
		if (isPublicAccess) return true;

		const request = context.switchToHttp().getRequest();
		const secret = this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET');
		if (!secret) {
			throw new InternalServerErrorException('Secret token not found');
		}

		const payload = await this.getTokenPayload(request, secret);

		const userDetail = new TokenUserDetail();
		userDetail.id = +payload['userId'];
		userDetail.name = payload['userName'];
		userDetail.companyId = payload['companyId'];
		userDetail.permissions = payload['permisssions'];
		request.userDetail = userDetail;

		const strPermissions: string = payload.permissions;
		const shouldProceedRequest = await this.checkIsUserHasRightPermission(context, new Set(strPermissions));
		if (!shouldProceedRequest) {
			throw new ForbiddenException('User does not have permission to access this feature');
		}

		return true;
	}

	private checkIsPublicAccess(context: ExecutionContext): boolean {
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			context.getHandler(),
			context.getClass(),
		]);

		return isPublic;
	}

	private async checkIsUserHasRightPermission(
		context: ExecutionContext,
		userPermissions: Set<string>
	): Promise<boolean> {
		const requiredPermissions = this.reflector.getAllAndOverride<PermissionEnum[]>(PERMISSION_KEY, [
			context.getHandler(),
			context.getClass(),
		]);

		if (requiredPermissions && requiredPermissions.length > 0) {
			for (const requiredPermission of requiredPermissions) {
				if(userPermissions.has(requiredPermission)) {
					return true;
				};
			}
			return false;
		}

		return true;
	}

	private async getTokenPayload(request: Request, secret: string) {
		const [type, token] = request.headers['authorization']?.split(' ') ?? [];
		const requestToken = type === 'Bearer' ? token : undefined;
		if (!requestToken) {
			throw new BadRequestException('Token is Empty');
		}

		let payload;

		try {
			payload = await this.jwtService.verifyAsync(token, { secret });
		} catch (e) {
			throw new UnauthorizedException('Token is invalid');
		}

		if (!payload.exp || payload.exp < new Date().getTime() / 1000) {
			throw new UnauthorizedException('Token is expired');
		}

		return payload;
	}
}
