import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class RolesPermissionsTable1767134933058 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'roles_permissions',
                columns: [
                {
                    name: 'role_id',
                    type: 'int',
                    unsigned: true,
                    isPrimary: true,
                },
                {
                    name: 'permission_id',
                    type: 'int',
                    unsigned: true,
                    isPrimary: true,
                },
                ],
            }),
            true,
        );

        await queryRunner.createForeignKeys('roles_permissions', [
            new TableForeignKey({
                columnNames: ['role_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'roles',
                onDelete: 'NO ACTION',
                onUpdate: 'NO ACTION',
            }),
            new TableForeignKey({
                columnNames: ['permission_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'permissions',
                onDelete: 'NO ACTION',
                onUpdate: 'NO ACTION',
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('roles_permissions');
        await queryRunner.dropForeignKey('roles_permissions', 'role_id');
        await queryRunner.dropForeignKey('roles_permissions', 'permission_id');
    }

}
