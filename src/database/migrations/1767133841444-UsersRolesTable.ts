import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class UsersRolesTable1767133841444 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users_roles',
                columns: [
                    {
                        name: 'user_id',
                        type: 'bigint',
                        unsigned: true,
                        isPrimary: true,
                    },
                    {
                        name: 'role_id',
                        type: 'int',
                        unsigned: true,
                        isPrimary: true,
                    },
                ],
            }),
            true,
        );

        await queryRunner.createForeignKeys('users_roles', [
            new TableForeignKey({
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'NO ACTION',
                onUpdate: 'NO ACTION',
            }),
            new TableForeignKey({
                columnNames: ['role_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'roles',
                onDelete: 'NO ACTION',
                onUpdate: 'NO ACTION',
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('users_roles', 'user_id');
        await queryRunner.dropForeignKey('users_roles', 'role_id');
        await queryRunner.dropTable('users_roles');
    }

}
