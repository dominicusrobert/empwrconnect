import { MigrationInterface, QueryRunner, TableColumn, TableIndex } from 'typeorm';

export class AddIdempotencyKeyToAppointments1767169800000 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'appointments',
			new TableColumn({
				name: 'idempotency_key',
				type: 'varchar',
				length: '100',
				isNullable: true,
			}),
		);

		await queryRunner.createIndex(
			'appointments',
			new TableIndex({
				name: 'UQ_appointments_idempotency_key',
				columnNames: ['idempotency_key'],
				isUnique: true,
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropIndex('appointments', 'UQ_appointments_idempotency_key');
		await queryRunner.dropColumn('appointments', 'idempotency_key');
	}
}
