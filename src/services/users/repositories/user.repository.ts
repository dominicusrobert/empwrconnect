import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { BaseRepository } from '../../../base/base.repository';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepository extends BaseRepository<UserEntity> {
	constructor(
		@InjectRepository(UserEntity)
		private readonly repository: Repository<UserEntity>
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async findByEmail(email: string): Promise<UserEntity> {
		const user = await this.repository.findOneBy({ email });
		if (!user) {
			throw new NotFoundException('User not found');
		}

		return user;
	}

	async generateJwtPayload(email: string, companyId: number) {
		const user = await this.findOne({
			where: { email },
			relations: [
				'userRolesCompanies',
				'userRolesCompanies.role',
				'userRolesCompanies.role.rolePermissions',
				'userRolesCompanies.role.rolePermissions.permission',
			],
		});

		if (!user) {
			throw new NotFoundException('User Role not found');
		}

		const urc = user.userRolesCompanies?.find((row) => row.companyId == companyId);
		const permissions =
			urc?.role?.rolePermissions?.map((rp) => rp.permission?.name).filter(Boolean) ?? [];

		return {
			userId: user.id,
			userName: user.name,
			companyId,
			permissions,
		};
	}

}
