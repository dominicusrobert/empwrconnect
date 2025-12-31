import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";

export class AppointmentsTable1767139462755 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "appointments",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "company_staff_schedule_id",
                        type: "bigint",
                        isNullable: false
                    },
                    {
                        name: "client_id",
                        type: "bigint",
                        isNullable: false
                    },
                    {
                        name: "staff_id",
                        type: "bigint",
                        isNullable: false
                    },
                    {
                        name: "status",
                        type: "smallint",
                        isNullable: false,
                        default: "0",
                        comment: "Appointment status enum (0=pending,1=confirmed,2=done,3=cancelled)",
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
            true
        );

        await queryRunner.createIndex(
            "appointments",
            new TableIndex({
                name: "IDX_appointments_company_staff_schedule_id",
                columnNames: ["company_staff_schedule_id"],
            })
        );

        await queryRunner.createIndex(
            "appointments",
            new TableIndex({
                name: "IDX_appointments_client_id",
                columnNames: ["client_id"],
            })
        );

        await queryRunner.createIndex(
            "appointments",
            new TableIndex({
                name: "IDX_appointments_staff_id",
                columnNames: ["staff_id"],
            })
        );

        await queryRunner.createForeignKeys("appointments", [
            new TableForeignKey({
                name: "FK_appointments_staff_schedule",
                columnNames: ["company_staff_schedule_id"],
                referencedTableName: "staffs_schedules",
                referencedColumnNames: ["id"],
                onDelete: "RESTRICT",
                onUpdate: "CASCADE",
            }),
            new TableForeignKey({
                name: "FK_appointments_client",
                columnNames: ["client_id"],
                referencedTableName: "users",
                referencedColumnNames: ["id"],
                onDelete: "RESTRICT",
                onUpdate: "CASCADE",
            }),
            new TableForeignKey({
                name: "FK_appointments_staff",
                columnNames: ["staff_id"],
                referencedTableName: "users",
                referencedColumnNames: ["id"],
                onDelete: "RESTRICT",
                onUpdate: "CASCADE",
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('appointments');
    }

}
