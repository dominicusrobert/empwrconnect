import { Injectable } from '@nestjs/common';
import { ObjectLiteral, Repository } from 'typeorm';

import { CustomQueryBuilderHelper } from '../utils/repositories/custom-query-builder.helpers';


@Injectable()
export class BaseRepository<T extends ObjectLiteral> extends Repository<T> {
	async getCustomQueryBuilder(): Promise<CustomQueryBuilderHelper<T>> {
		const entityName = this.getEntityName();
		const qb = await this.createQueryBuilder(entityName);
		return new CustomQueryBuilderHelper(qb);
	}

	getEntityName(): string {
		const entityName = this.metadata.targetName;
		const replacedName = entityName.replace(/Entity$/, '');

		return replacedName.slice(-1) == 'y' ?
			replacedName.slice(0, -1).concat('ies').toLowerCase() :
			replacedName.concat('s').toLowerCase();
	}
}
