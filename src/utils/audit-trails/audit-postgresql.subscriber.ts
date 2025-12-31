import { Injectable } from '@nestjs/common';
import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';

@Injectable()
@EventSubscriber()
export class AuditPostgreSQLSubscriber implements EntitySubscriberInterface<any> {
	constructor() {}

	async afterInsert(event: InsertEvent<any>) {
		await this.logAuditTrail(event, event.entity);
	}

	async beforeUpdate(event: UpdateEvent<any>) {
		await this.logAuditTrail(event, event.entity);
	}

	private async logAuditTrail(event: InsertEvent<any> | UpdateEvent<any>, after: any) {
		if (event.metadata.tableName === 'audit_trail' || !after) return;

		const queryRunner = event.queryRunner;
		const user = (queryRunner as any).currentUser;
		const userId = user?.id ?? null;
		const isUpdate = 'databaseEntity' in event;
		const before = isUpdate ? this.safeClone((event as UpdateEvent<any>).databaseEntity) : null;
		const afterPayload = this.safeClone(after);
		const type = `${event.metadata.name}:${isUpdate ? 'update' : 'insert'}`;

		await queryRunner.manager.query(
			'INSERT INTO audit_trail (user_id, type, before, after, reason) VALUES ($1, $2, $3, $4, $5)',
			[userId, type, before, afterPayload, null],
		);
	}

	private safeClone<T>(value: T): T | null {
		try {
			return value ? JSON.parse(JSON.stringify(value)) : null;
		} catch {
			return null;
		}
	}
}
