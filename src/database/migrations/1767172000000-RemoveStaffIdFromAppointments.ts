import { MigrationInterface, QueryRunner, TableForeignKey, TableIndex } from 'typeorm';

export class RemoveStaffIdFromAppointments1767172000000 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const table = await queryRunner.getTable('appointments');
		if (!table) return;

		const fk = table.foreignKeys.find((f) => f.columnNames.includes('staff_id'));
		if (fk) {
			await queryRunner.dropForeignKey('appointments', fk);
		}

		const idx = table.indices.find((i) => i.columnNames.includes('staff_id'));
		if (idx) {
			await queryRunner.dropIndex('appointments', idx);
		}

		const col = table.columns.find((c) => c.name === 'staff_id');
		if (col) {
			await queryRunner.dropColumn('appointments', col);
		}
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		// Recreate column with FK and index
		await queryRunner.query(`ALTER TABLE "appointments" ADD "staff_id" bigint NOT NULL DEFAULT 0`);

		await queryRunner.createIndex(
			'appointments',
			new TableIndex({
				name: 'IDX_appointments_staff_id',
				columnNames: ['staff_id'],
			}),
		);

		await queryRunner.createForeignKey(
			'appointments',
			new TableForeignKey({
				name: 'FK_appointments_staff',
				columnNames: ['staff_id'],
				referencedTableName: 'users',
				referencedColumnNames: ['id'],
				onDelete: 'RESTRICT',
				onUpdate: 'CASCADE',
			}),
		);
		await queryRunner.query(`ALTER TABLE "appointments" ALTER COLUMN "staff_id" DROP DEFAULT`);
	}
}
