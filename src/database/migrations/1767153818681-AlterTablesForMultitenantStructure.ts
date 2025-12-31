import {
	MigrationInterface,
	QueryRunner,
	Table,
	TableForeignKey,
	TableIndex,
} from 'typeorm';

export class AlterTablesForMultitenantStructure1767153818681 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DROP TABLE IF EXISTS "users_roles" CASCADE');

		await queryRunner.createTable(
			new Table({
				name: 'users_roles_companies',
				columns: [
					{
						name: 'id',
						type: 'bigint',
						isPrimary: true,
						isGenerated: true,
						unsigned: true,
						generationStrategy: 'increment',
					},
					{
						name: 'user_id',
						type: 'bigint',
						unsigned: true,
					},
					{
						name: 'role_id',
						type: 'int',
						unsigned: true,
					},
					{
						name: 'company_id',
						type: 'bigint',
						unsigned: true,
					},
					{
						name: 'created_at',
						type: 'timestamp',
						default: 'now()',
					},
					{
						name: 'updated_at',
						type: 'timestamp',
						default: 'now()',
					},
					{
						name: 'deleted_at',
						type: 'timestamp',
						isNullable: true,
					},
				],
			}),
			true,
		);

		await queryRunner.createIndex(
			'users_roles_companies',
			new TableIndex({
				name: 'IDX_users_roles_companies_unique',
				columnNames: ['user_id', 'role_id', 'company_id'],
				isUnique: true,
			}),
		);

		await queryRunner.createForeignKeys('users_roles_companies', [
			new TableForeignKey({
				columnNames: ['user_id'],
				referencedColumnNames: ['id'],
				referencedTableName: 'users',
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			}),
			new TableForeignKey({
				columnNames: ['role_id'],
				referencedColumnNames: ['id'],
				referencedTableName: 'roles',
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			}),
			new TableForeignKey({
				columnNames: ['company_id'],
				referencedColumnNames: ['id'],
				referencedTableName: 'companies',
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			}),
		]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('users_roles_companies', true, true, true);

		await queryRunner.query('DROP TABLE IF EXISTS "users_roles_companies" CASCADE');

		// revert removal of legacy tables (no-op if they still exist)
		await queryRunner.query('CREATE TABLE IF NOT EXISTS "roles_permissions" ("role_id" int, "permission_id" int)');
		await queryRunner.query('CREATE TABLE IF NOT EXISTS "users_roles" ("user_id" bigint, "role_id" int)');
    }

}
