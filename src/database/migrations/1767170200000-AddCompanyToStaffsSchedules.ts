import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey, TableIndex } from 'typeorm';

export class AddCompanyToStaffsSchedules1767170200000 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'staffs_schedules',
			new TableColumn({
				name: 'company_id',
				type: 'bigint',
				isNullable: false,
			}),
		);

		await queryRunner.createIndex(
			'staffs_schedules',
			new TableIndex({
				name: 'IDX_staffs_schedules_company_id',
				columnNames: ['company_id'],
			}),
		);

		await queryRunner.createForeignKey(
			'staffs_schedules',
			new TableForeignKey({
				name: 'FK_staffs_schedules_company',
				columnNames: ['company_id'],
				referencedTableName: 'companies',
				referencedColumnNames: ['id'],
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		const table = await queryRunner.getTable('staffs_schedules');
		const fk = table?.foreignKeys.find((f) => f.columnNames.includes('company_id'));
		if (fk) {
			await queryRunner.dropForeignKey('staffs_schedules', fk);
		}
		await queryRunner.dropIndex('staffs_schedules', 'IDX_staffs_schedules_company_id');
		await queryRunner.dropColumn('staffs_schedules', 'company_id');
	}
}
