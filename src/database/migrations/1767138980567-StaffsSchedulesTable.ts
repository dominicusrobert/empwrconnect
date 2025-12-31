import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class StaffsSchedulesTable1767138980567 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'staffs_schedules',
                columns: [
                    {
                        name: 'id',
                        type: 'bigint',
                        unsigned: true,
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: "staff_id",
                        type: "bigint",
                        isNullable: false
                    },
                    {
                        name: "shift_id",
                        type: "int",
                        isNullable: false
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

        await queryRunner.createForeignKeys("staffs_schedules", [
            new TableForeignKey({
                name: "FK_staffs_schedules_staff",
                columnNames: ["staff_id"],
                referencedTableName: "users",
                referencedColumnNames: ["id"],
                onDelete: "RESTRICT",
                onUpdate: "CASCADE",
            }),
            new TableForeignKey({
                name: "FK_staffs_schedules_shift",
                columnNames: ["shift_id"],
                referencedTableName: "shifts",
                referencedColumnNames: ["id"],
                onDelete: "RESTRICT",
                onUpdate: "CASCADE",
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('staffs_schedules');
    }

}
