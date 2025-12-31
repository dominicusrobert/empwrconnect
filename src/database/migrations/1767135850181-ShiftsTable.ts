import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class ShiftsTable1767135850181 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'shifts',
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
                        name: "day",
                        type: "smallint",
                        isNullable: false,
                        comment: "Day of week (1-7)",
                    },
                    {
                        name: "start_time",
                        type: "time",
                        isNullable: false,
                    },
                    {
                        name: "end_time",
                        type: "time",
                        isNullable: false,
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
            "shifts",
            new TableIndex({
                name: "IDX_shifts_day",
                columnNames: ["day"],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('shifts');
    }

}
