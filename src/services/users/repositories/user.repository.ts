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

	async generateJwtPayload(email: string) {
		const user = await this.findOne({
			where: { email },
			relations: ['roles'],
		});

		if (!user) {
			throw new NotFoundException('User Role not found');
		}

        return {
			userId: user.id,
			userName: user.name,
		};
	}

}
