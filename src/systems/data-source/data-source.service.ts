import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, EntityManager } from 'typeorm';

import { TokenUserDetail } from '../../utils/dto/token-user-detail.dto';

@Injectable()
export class DataSourceService {
	constructor(
		@InjectDataSource() private readonly appDataSource: DataSource
	) {}

	async transaction<T>(
		userDetail: TokenUserDetail,
		callback: (queryRunnerManager: EntityManager) => Promise<T>
	): Promise<T> {
		return new Promise(async (resolve, reject) => {
			const queryRunner = this.appDataSource.createQueryRunner();
			await queryRunner.connect();
			await queryRunner.startTransaction();

			try {
				const result = await callback(queryRunner.manager);
				await queryRunner.commitTransaction();

				resolve(result);
			} catch (e) {
				await queryRunner.rollbackTransaction();

                console.log('Failed to Commit Transaction');
                console.log(e);

				const error = new InternalServerErrorException('Something unexpected happened');
				reject(error);
			} finally {
				await queryRunner.release();
			}
		});
	}

}
