import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey, TableIndex } from 'typeorm';

export class AddLocationToAppointments1767167500000 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'appointments',
			new TableColumn({
				name: 'location_id',
				type: 'int',
				isNullable: true,
			}),
		);

		await queryRunner.createIndex(
			'appointments',
			new TableIndex({
				name: 'IDX_appointments_location_id',
				columnNames: ['location_id'],
			}),
		);

		await queryRunner.createForeignKey(
			'appointments',
			new TableForeignKey({
				name: 'FK_appointments_location',
				columnNames: ['location_id'],
				referencedTableName: 'locations',
				referencedColumnNames: ['id'],
				onDelete: 'SET NULL',
				onUpdate: 'CASCADE',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		const table = await queryRunner.getTable('appointments');
		const fk = table?.foreignKeys.find((f) => f.columnNames.includes('location_id'));
		if (fk) {
			await queryRunner.dropForeignKey('appointments', fk);
		}
		await queryRunner.dropIndex('appointments', 'IDX_appointments_location_id');
		await queryRunner.dropColumn('appointments', 'location_id');
	}
}
